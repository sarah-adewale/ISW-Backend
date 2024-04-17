import express from 'express';
import httpProxy from 'http-proxy';


const port = process.env.PORT || 4000;

const proxy = httpProxy.createProxyServer();
const app = express();


app.get('/', (req, res) => {
    res.send('API is running!');
})


app.listen(port, () => {
    console.log(`api gateway is listening on port ${port}!`);
});

