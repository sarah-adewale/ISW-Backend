import express from 'express';
import httpProxy from 'http-proxy';


const port = process.env.PORT || 4000;

const proxy = httpProxy.createProxyServer();
const app = express();


// Route requests to the auth service
app.use("/api/users", (req, res) => {
  proxy.web(req, res, { target: "http://auth:4200" });
});

// Route requests to the product service
app.use("/api/product", (req, res) => {
  proxy.web(req, res, { target: "http://product:3000" });
});

// Route requests to the order service
app.use("/api/orders", (req, res) => {
  proxy.web(req, res, { target: "http://order:4300" });
});

app.get('/', (req, res) => {
    res.send('API is running!');
})


app.listen(port, () => {
    console.log(`api gateway is listening on port ${port}!`);
});

