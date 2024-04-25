import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js'; // Import connectDB function
import dotenv from 'dotenv';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js'; // Import product routes
import transactionRoutes from './src/routes/transactionRoutes.js'; // Import transaction routes
import cors from 'cors';
import multer from 'multer'; // Import multer package

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Connect to MongoDB database
connectDB();

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded image
  }
});

// Create multer instance with specified storage
const upload = multer({ storage: storage });

// Mount multer middleware to handle file uploads
app.use(upload.single('image'));

// Routes for categories
app.use('/api/category', categoryRoutes);

// Routes for products
app.use('/api/product', productRoutes);

// Routes for transactions
app.use('/api/transaction', transactionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
