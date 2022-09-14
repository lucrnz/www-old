import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const baseDir = dirname(fileURLToPath(import.meta.url));
const spaDir = join(baseDir, 'dist');

if (!existsSync(spaDir)) {
    console.error('Error: SPA folder does not exist. Did you forget to run the build script?');
    process.exit(1);
}

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use('/', express.static(spaDir));

app.get('/*', (req, res) => {
    res.sendFile(join(spaDir, 'index.html'));
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
