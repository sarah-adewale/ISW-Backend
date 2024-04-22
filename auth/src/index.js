import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "../config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const port = process.env.PORT || 4200;

connectDB()

// Allow requests from localhost
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

const app = express();

// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));

// cookie parser middleware
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server is listening on port ${port}!`);
});