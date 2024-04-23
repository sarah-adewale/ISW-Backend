import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js'; // Import connectDB function
import dotenv from 'dotenv';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js'; // Import product routes
import transactionRoutes from './src/routes/transactionRoutes.js'; // Import transaction routes
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Routes for categories
app.use('/api/category', categoryRoutes);

// Routes for products
app.use('/api/product', productRoutes);

// Routes for transactions
app.use('/api/transaction', transactionRoutes);

// Connect to MongoDB database
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
