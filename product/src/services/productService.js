// services/productService.js

import Product from '../models/product.js';

// Create a new product
export const createProduct = async (data) => {
    return await Product.create(data);
};

// Read a product by ID
export const getProductById = async (productId) => {
    return await Product.findById(productId);
};

// Update a product by ID
export const updateProduct = async (productId, newData) => {
    return await Product.findByIdAndUpdate(productId, newData, { new: true });
};

// Read all products
export const getAllProducts = async () => {
    return await Product.find();
};


// Delete a product by ID
export const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
