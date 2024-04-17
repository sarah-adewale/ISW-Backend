import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import httpProxy from 'http-proxy';
dotenv.config();


const port = process.env.PORT || 4000;

const proxy = httpProxy.createProxyServer();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API is running!');
})


app.listen(port, () => {
    console.log(`api gateway is listening on port ${port}!`);
});

