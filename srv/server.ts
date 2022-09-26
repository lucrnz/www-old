// @TODO:   Node + TypeScript is really weird as a backend ???
//          .NET Core C# M̶i̶c̶r̶o̶s̶o̶f̶t̶ ̶D̶a̶d̶d̶y̶ ?? Go ? Rust? Deno?? P̶y̶t̶h̶o̶n̶ ̶+̶ ̶F̶l̶a̶s̶k̶

import express from 'express';
import dotenv from 'dotenv';
import type { BinaryLike } from 'node:crypto';
import { createHash } from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { StatusCodes } from 'http-status-codes';
import type { ContentPage } from '../src/types/ContentPage';
import type { BlogArticle } from '../src/types/BlogArticle';

const baseDir = dirname(fileURLToPath(import.meta.url));
const spaDir = resolve(join(baseDir, '..', 'dist'));
const imgDir = resolve(join(baseDir, '..', 'img'));
const blogDir = resolve(join(baseDir, 'blog'));
const pagesDir = resolve(join(baseDir, 'pages'));

if (!existsSync(spaDir) || !existsSync(imgDir) || !existsSync(blogDir) || !existsSync(pagesDir)) {
    console.error('Error: Any of these folders does not exists', {
        spaDir,
        imgDir,
        blogDir,
        pagesDir,
    });
    process.exit(1);
}

const hashData = (data: BinaryLike) => createHash('sha256').update(data).digest('hex');

type HashedResource<T> = {
    hash: string;
    value: T;
};

type ProcessEntryAttributes = { [key: string]: string };

type ProcessEntryItem = {
    fileName: string;
    fileNameNoExt: string;
    contents: string;
    attributes: ProcessEntryAttributes;
};

const readMarkdownFilesAndParseAttributes = (
    directory: string,
    processEntry: (item: ProcessEntryItem) => void
) => {
    for (const entry of readdirSync(directory)) {
        if (!entry.includes('.md')) {
            continue;
        }

        const fpath = join(directory, entry);
        const contents = readFileSync(fpath).toString('utf-8');
        const enterTag = '<!--';
        const closeTag = '-->';
        const enterTagIndex = contents.indexOf(enterTag);
        const closeTagIndex = contents.indexOf(closeTag);

        if (enterTagIndex === -1 || closeTagIndex === -1) {
            console.error(`Invalid blog entry: ${fpath} : No attributes json tag.`);
            continue;
        }

        if (enterTagIndex !== -1 && closeTagIndex !== -1) {
            const jsonData = contents
                .substring(enterTagIndex + enterTag.length, closeTagIndex)
                .trim();
            let attributes = {};

            try {
                attributes = JSON.parse(jsonData);
            } catch (err) {
                console.error(`Invalid entry: ${fpath} : Attributes data json parse failed.`);
                console.error(err);
                continue;
            }

            if (Object.keys(attributes).length === 0) {
                console.error(`Invalid entry: ${fpath} : Attributes has no keys.`);
                continue;
            }

            processEntry({
                fileName: entry,
                fileNameNoExt: entry.split('.md')[0],
                contents: contents.substring(closeTagIndex + closeTag.length).trim(),
                attributes,
            } as ProcessEntryItem);
        }
    }
};

const blogArticles: HashedResource<BlogArticle>[] = [];
const contentPages: HashedResource<ContentPage>[] = [];

readMarkdownFilesAndParseAttributes(blogDir, (entry: ProcessEntryItem) => {
    const blogArticle = {
        id: entry.fileNameNoExt,
        title: entry.attributes['title'],
        contents: entry.contents,
        creationDate: new Date(Number(entry.attributes['creationDate'])),
        description: entry.attributes['description'],
    } as BlogArticle;

    const hash = hashData(
        `${blogArticle.id}${blogArticle.title}${blogArticle.contents}${blogArticle.creationDate}${blogArticle.description}`
    );
    blogArticles.push({
        value: blogArticle,
        hash,
    } as HashedResource<BlogArticle>);
});

readMarkdownFilesAndParseAttributes(pagesDir, (entry: ProcessEntryItem) => {
    const page = {
        id: entry.fileNameNoExt,
        title: entry.attributes['title'],
        contents: entry.contents,
    } as ContentPage;
    const hash = hashData(`${page.id}${page.title}${page.contents}`);

    contentPages.push({
        value: page,
        hash,
    } as HashedResource<ContentPage>);
});

console.log(`📄 Loaded ${blogArticles.length} blog articles.`);
console.log(`📄 Loaded ${contentPages.length} pages.`);

dotenv.config();
const app = express();
const port = (process.env.PORT ? Number(process.env.PORT) : 0) || 8000;

const antiPathTransversalAttack = (path: string): boolean =>
    path.includes('..') || path.includes('/');

app.disable('x-powered-by');

app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

app.get('/image/:id', async (req, res) => {
    const id = req.params.id;
    const doGetHash: boolean = Boolean(req.query.hash);

    if (isNaN(parseInt(id))) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const filePath = join(imgDir, id);

    if (!existsSync(filePath)) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    const fileData = await readFile(filePath);

    if (doGetHash) {
        res.type('text');
        res.send(hashData(fileData));
    } else {
        const fileInfo = await fileTypeFromBuffer(fileData);
        res.writeHead(200, {
            'Content-Type': fileInfo?.mime,
            'Content-disposition': `attachment;filename=image-${id}.${fileInfo?.ext}`,
            'Content-Length': fileData.length,
        });
        res.end(fileData);
    }
});

app.get('/api/content-pages/:id', (req, res) => {
    const id = req.params.id;
    const doGetHash: boolean = Boolean(req.query.hash);

    if (antiPathTransversalAttack(id)) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const resource: HashedResource<ContentPage> | undefined = contentPages.find(
        (page) => page.value.id === id
    );
    const found = resource !== undefined;

    if (doGetHash) {
        if (resource === undefined) {
            return res.sendStatus(StatusCodes.NOT_FOUND);
        }
        res.type('text');
        res.send(resource.hash);
    } else {
        res.status(found ? StatusCodes.OK : StatusCodes.NOT_FOUND);
        return res.json(found ? { found, response: resource.value } : { found });
    }
});

app.get('/api/blog-articles', (req, res) => {
    // Return articles sorted desc. (Latest first.)
    const doGetHash: boolean = Boolean(req.query.hash);
    const resources = blogArticles.sort(
        (a, b) => Number(b.value.creationDate) - Number(a.value.creationDate)
    );

    if (resources.length === 0) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    if (doGetHash) {
        let accumulator = '';
        for (const resource of resources) {
            accumulator += `${resource.hash};`;
        }

        res.type('text');
        return res.send(hashData(accumulator));
    } else {
        const response = resources.map(
            (res) =>
                ({
                    id: res.value.id,
                    title: res.value.title,
                    creationDate: res.value.creationDate,
                    readTimeMinutes: res.value.readTimeMinutes,
                    description: res.value.description,
                } as Partial<BlogArticle>)
        );
        return res.json({ response });
    }
});

app.get('/api/blog-articles/:id', (req, res) => {
    const id = req.params.id;
    const doGetHash: boolean = Boolean(req.query.hash);

    if (antiPathTransversalAttack(id)) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const resource: HashedResource<BlogArticle> | undefined = blogArticles.find(
        (res) => res.value.id === id
    );
    if (resource === undefined) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    if (doGetHash) {
        res.type('text');
        return res.send(resource.hash);
    } else {
        return res.json({ response: resource.value });
    }
});

app.use('/', express.static(spaDir));

app.get('/*', (_, res) => {
    res.sendFile(join(spaDir, 'index.html'));
});

app.listen(port, () => console.log(`🦄 Server listening on port ${port}`));
