// controllers/productController.js

import * as productService from '../services/productService.js';
import Joi from 'joi';
import multer from 'multer';
import path from 'path';
import { protect, admin } from '../middleware/authMiddleware.js';

// Define storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads/';
        fs.mkdir(uploadDir, { recursive: true }, function (err) {
            if (err) {
                console.error('Error creating directory:', err);
            }
            cb(null, uploadDir);
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Create multer instance with specified storage
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only images are allowed');
    }
});

// Define a Joi schema for product data validation
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().uri({ scheme: ['http', 'https'] })
});

// Validate product data
const validateProductData = (data) => {
    return productSchema.validate(data);
};

// Create a new product
export const createProduct = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: err.message });
            } else if (err) {
                return res.status(400).json({ message: 'Error uploading file' });
            }

            const data = req.body;
            const { error } = validateProductData(data);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            data.imageUrl = req.file.path;
            const product = await productService.createProduct(data);
            res.status(201).json(product);
        });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ message: 'Product name must be unique as a product already exists with such name' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const newData = req.body;
        const { error } = validateProductData(newData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const updatedProduct = await productService.updateProduct(productId, newData);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ message: 'Product name must be unique as a product already exists with such name' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const user = req.user;
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (user.isAdmin || product.user.toString() === user._id.toString()) {
            const deletedProduct = await productService.deleteProduct(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.json({ message: 'Product deleted successfully' });
        } else {
            return res.status(403).json({ message: 'Unauthorized to delete this product' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
