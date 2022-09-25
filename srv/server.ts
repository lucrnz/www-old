// @TODO:   FIX IMPORT SO I can have the blog on another file!!!!!!!
// @TODO:   Node + TypeScript is really weird as a backend ???
//          .NET Core C# M̶i̶c̶r̶o̶s̶o̶f̶t̶ ̶D̶a̶d̶d̶y̶ ?? Go ? Rust? Deno?? P̶y̶t̶h̶o̶n̶ ̶+̶ ̶F̶l̶a̶s̶k̶
/*  --------------------------------------------------------*/
/*  --------------------------------------------------------*/
/* pages.ts */
/*  --------------------------------------------------------*/

const contentPages: ContentPage[] = [
    {
        id: 'about-me',
        title: 'About me',
        contents: [
            compose(
                [
                    `My Name is Lucien, I am 27 years old. I go by they/them pronouns.`,
                    `I am a developer from Argentina.`,
                ],
                'About me'
            ),
            compose(
                [
                    `I learned programming by myself, I find it enjoyable to create programs or scripts that` +
                        `solves problems.`,
                    `I work as a fullstack software developer at a known international company, but I enjoy` +
                        `a lot more front-end.`,
                    `My tech skills include but are not limited to: JavaScript, C#, Go and a little bit of C.` +
                        `Even tho I dont wanna touch C ever again.`,
                    `Originally I created this website to practice my front-end development skills.`,
                ],
                'Hobbies: Programming'
            ),
            compose(
                [
                    `Apart from programming I enjoy gaming (both PC and VR), going out for a walk, working
                    out,`,
                    `watching cartoons or tv shows, and generally enjoying my time with my partner.`,
                ],
                'Hobbies: General'
            ),
            toggeableSection('Life views', [
                compose([
                    `I have my own definition of nihilism, I try to re-think how I interact with everything` +
                        `and find my own conclusions about them.`,
                    `While I try to remain positive as I found out that being too realistic or negative is` +
                        `depressive.`,
                    `I identify as gender non-binary, as I dont associate with either cultural masculiny or`,
                    `femininity, I enjoy creating my own meaning of gender expression. I fully support LGBTQIA+.`,
                    `I believe everyone should be treated the same regardless of gender, and that people` +
                        `should show their own interests instead of what society tells them to do.`,
                    `I believe killing animals for own pleasure or enjoyment is bad and should not be done.` +
                        `I only feed myself with plant based food.`,
                    `I don't believe in modern feminism as It seems to be hembrism or female-side sexism.`,
                ]),
            ]),
        ],
    },
];

/*  --------------------------------------------------------*/
/* server.ts */
/*  --------------------------------------------------------*/
import express from 'express';
import dotenv from 'dotenv';
import { fileTypeFromBuffer } from 'file-type';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { StatusCodes } from 'http-status-codes';

const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const spaDir = join(baseDir, 'dist');
const imgDir = join(baseDir, 'img');

if (!existsSync(spaDir)) {
    console.error('Error: SPA folder does not exist. Did you forget to run the build script?');
    process.exit(1);
}

if (!existsSync(imgDir)) {
    console.error('Error: Images folder does not exist.');
    process.exit(1);
}

dotenv.config();

const app = express();
const port = (process.env.PORT ? Number(process.env.PORT) : 0) || 8000;

app.disable('x-powered-by');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/image/:id', async (req, res) => {
    const id = req.params.id;

    if (isNaN(parseInt(id))) {
        return res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    const filePath = join(imgDir, id);

    if (!existsSync(filePath)) {
        return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    const fileData = await readFile(filePath);
    const fileInfo = await fileTypeFromBuffer(fileData);

    res.writeHead(200, {
        'Content-Type': fileInfo?.mime,
        'Content-disposition': `attachment;filename=image-${id}.${fileInfo?.ext}`,
        'Content-Length': fileData.length,
    });
    res.end(fileData);
});

app.get('/api/content-pages/:id', (req, res) => {
    const id = req.params.id;
    const response = contentPages.find((page) => page.id === id);
    const found = response !== undefined;

    res.status(found ? StatusCodes.OK : StatusCodes.NOT_FOUND);
    return res.json(found ? { found, response } : { found });
});

app.get('/api/blog-articles', (req, res) => {
    // Return articles sorted desc. (Latest first.)
    const response = blogArticles
        .map((article) => ({
            id: article.id,
            title: article.title,
            creationDate: article.creationDate,
            readTimeMinutes: article.readTimeMinutes,
            description: article.description,
        }))
        .sort((a, b) => Number(b.creationDate) - Number(a.creationDate));
    const found = response !== undefined;
    res.status(found ? StatusCodes.OK : StatusCodes.NOT_FOUND);
    return res.json(found ? { found, response } : { found });
});

app.get('/api/blog-articles/:id', (req, res) => {
    const id = req.params.id;
    const response = blogArticles.find((article) => article.id === id);
    const found = response !== undefined;
    res.status(found ? StatusCodes.OK : StatusCodes.NOT_FOUND);
    return res.json(found ? { found, response } : { found });
});

app.use('/', express.static(spaDir));

app.get('/*', (_, res) => {
    res.sendFile(join(spaDir, 'index.html'));
});

app.listen(port, () => console.log(`🦄 Server listening on port ${port}`));
