import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import type { BlogArticle } from './src/types/BlogArticle';

const baseDir = dirname(fileURLToPath(import.meta.url));
const spaDir = join(baseDir, 'dist');

if (!existsSync(spaDir)) {
    console.error('Error: SPA folder does not exist. Did you forget to run the build script?');
    process.exit(1);
}

dotenv.config();

const app = express();
const port = (process.env.PORT ? Number(process.env.PORT) : 0) || 8000;

const blogArticles: BlogArticle[] = [
    {
        id: 'ab5a7b1e-c549-4e31-9587-ecf5bbd6cc3e',
        title: 'My First post',
        contents: [
            {
                type: 'paragraph',
                values: ['Hello world!'],
            },
        ],
        creationDate: new Date(1663556808991),
    },
];

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/api/blog-articles', (req, res) => {
    const response = blogArticles.map((article) => article.id);
    return res.json({ response });
});

app.get('/api/blog-articles/:id', (req, res) => {
    const id = req.body.params.id;
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
