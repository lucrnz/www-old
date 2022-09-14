import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const baseDir = dirname(fileURLToPath(import.meta.url));
const spaDir = join(baseDir, 'dist');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use('/', express.static(spaDir));

app.get('/*', (req, res) => {
    res.sendFile(join(spaDir, 'index.html'));
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
