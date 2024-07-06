import express from 'express';
import { fileURLToPath } from 'url';
import * as path from "node:path";
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    console.log("listening on port 3000");
    res.sendFile(path.join(__dirname, '/templates/index.html'))
})

app.listen(3000)