// controllers/productController.js

import * as productService from '../services/productService.js';
import Joi from 'joi';

// Define a Joi schema for product data validation
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().min(0).required(),
    category: Joi.string(),
    quantity: Joi.number().min(0).required(),
    batchNumber: Joi.string(),
    dateSold: Joi.date()
});

// Create a new product
export const createProduct = async (req, res) => {
    const data = req.body;
    
    // Validate the data using the Joi schema
    const { error } = productSchema.validate(data);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const product = await productService.createProduct(data);
        res.status(201).json(product);
    } catch (error) {
        // Check if the error is due to uniqueness constraint violation
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ message: 'Product name must be unique as a product already exist with such name' });
        }
        res.status(400).json({ message: error.message });
    }
};
// Get a product by ID
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(req.params);
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
        
        // Validate the newData object using the Joi schema
        const { error } = productSchema.validate(newData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const updatedProduct = await productService.updateProduct(productId, newData);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        // Check if the error is due to uniqueness constraint violation
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ message: 'Product name must be unique as a product already exist with such name' });
        }
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
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