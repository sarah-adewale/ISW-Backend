import express from "express";
import dotenv from 'dotenv';
import connectDB from "../config/db.js";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors';

dotenv.config()

const port = process.env.PORT || 4200;

connectDB()
const app = express();

// Allow requests from localhost
const corsOptions = {
    origin: 'http://localhost:4300', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cookie parser middleware
app.use(cookieParser())

app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
});