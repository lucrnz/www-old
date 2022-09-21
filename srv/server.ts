// @TODO:   FIX IMPORT SO I can have the blog on another file!!!!!!!
// @TODO:   Node + TypeScript is really weird as a backend ???
//          .NET Core C# M̶i̶c̶r̶o̶s̶o̶f̶t̶ ̶D̶a̶d̶d̶y̶ ?? Go ? Rust? Deno?? P̶y̶t̶h̶o̶n̶ ̶+̶ ̶F̶l̶a̶s̶k̶
/*  --------------------------------------------------------*/
/* blog.ts */
/*  --------------------------------------------------------*/
import type { BlogArticle } from '../src/types/BlogArticle';
import type { RenderableContent } from '../src/types/RenderableContent';

/* copy and paste very funny right? :) 🤦 */
enum RenderableContentType {
    Paragraph,
    Section,
    ToggeableSection,
    Text,
    Link,
    Image,
    Title,
}

const paragraph = (value: RenderableContent[]): RenderableContent => ({
    type: RenderableContentType.Paragraph,
    params: { value },
});

const section = (value: RenderableContent[]): RenderableContent => ({
    type: RenderableContentType.Section,
    params: { value },
});

const textNode = (value: string): RenderableContent => ({
    type: RenderableContentType.Text,
    params: { value },
});

const image = (id: string, alt: string): RenderableContent => ({
    type: RenderableContentType.Image,
    params: { id, alt },
});

const title = (value: string): RenderableContent => ({
    type: RenderableContentType.Title,
    params: { value },
});

const textToParagraph = (text: string | string[]): RenderableContent[] => {
    const lines: string[] = Array.isArray(text) ? text : text.split('\n');
    const textNodes = lines.map((value) => textNode(value));

    return textNodes.map((textNode) => paragraph([textNode]));
};

const blogArticles: BlogArticle[] = [
    {
        id: 'ab5a7b1e-c549-4e31-9587-ecf5bbd6cc3e',
        title: 'Hello World - Why I created my website after 10 years',
        contents: [
            ...textToParagraph(
                `First of all: I'm not a native english speaker and I'm horrible at writing, sorry about that!.\n` +
                    `Finally, after reading a lot of blogs I can start mine. It's been a while since I have a website...\n` +
                    `If I don't count the last one where I bought a cheap xyz domain and totally forgot about it.. it's probably around 10 years.\n` +
                    `I enjoy lurking, it's how I am, creating content was not something that I really had in mind at that moment.\n` +
                    `Blogs are probably the most overused type for a personal site, but who cares?\n` +
                    `Writing about random stuff sounds really fun!`
            ),
            image('b35dace6-5087-43d7-8b00-0de64226b04c', 'Cup filled with coffee near book'),
        ],
        creationDate: new Date(1663556808991),
        readTimeMinutes: 2,
        description: 'This is my first post',
    },
    {
        id: '85ea9e0d-d3f7-4b51-b476-50f38c7b22fb',
        title: 'Second Post!',
        contents: [
            section([
                title('First section.'),
                ...textToParagraph(['There we go', 'More text!']),
                {
                    type: RenderableContentType.ToggeableSection,
                    params: {
                        title: 'Open me!',
                        value: [textNode('This is the folded content.')],
                    },
                },
            ]),
            section([
                title('Second section.'),
                ...textToParagraph([
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    'Nunc ante odio, molestie nec suscipit in, tristique vitae enim.',
                ]),
            ]),
        ],
        creationDate: new Date(1663592814762),
        readTimeMinutes: 1,
        description: 'This is my second post',
    },
];

/*  --------------------------------------------------------*/
/* server.ts */
/*  --------------------------------------------------------*/
import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

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

app.use('/image', express.static(imgDir));

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
    return res.json({ response });
});

app.get('/api/blog-articles/:id', (req, res) => {
    const id = req.params.id;
    const response = blogArticles.find((article) => article.id === id);

    if (response === undefined) {
        res.status(404);
    }

    return res.json({ response });
});

app.use('/', express.static(spaDir));

app.get('/*', (_, res) => {
    res.sendFile(join(spaDir, 'index.html'));
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
