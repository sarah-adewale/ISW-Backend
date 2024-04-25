// services/categoryService.js

import Category from '../models/category.js';

// Create a new category
export const createCategory = async (data) => {
    return await Category.create(data);
};

// Read a category by ID
export const getCategoryById = async (categoryId) => {
    return await Category.findById(categoryId);
};

// Read all categories
export const getAllCategories = async () => {
    return await Category.find();
};

// Update a category by ID
export const updateCategory = async (categoryId, newData) => {
    return await Category.findByIdAndUpdate(categoryId, newData, { new: true });
};

// Delete a category by ID
export const deleteCategory = async (categoryId) => {
    return await Category.findByIdAndDelete(categoryId);
};

// Get products by category
export const getProductsByCategory = async (categoryId) => {
    try {
        const products = await Product.find({ category: categoryId });
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
};