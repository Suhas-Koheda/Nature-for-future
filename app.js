import express from 'express';
import { fileURLToPath } from 'url';
import * as path from "node:path";
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/templates/index.html'))
})

app.listen(3000)