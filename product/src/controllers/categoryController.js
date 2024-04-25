// controllers/categoryController.js

import * as categoryService from '../services/categoryService.js';
import Joi from 'joi';
import { protect, admin } from '../middleware/authMiddleware.js';

// Define a Joi schema for category data validation
const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
});

// Validate category data
const validateCategoryData = (data) => {
    return categorySchema.validate(data);
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const products = await categoryService.getProductsByCategory(categoryId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
export const createCategory = protect(async (req, res) => {
    try {
        const { role, store } = req.user;
        const data = req.body;

        // Validate the request body against the Joi schema
        const { error } = categorySchema.validate(data);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if the user is an admin
        if (role === 'admin') {
            // Admin can create category in any store
            const category = await categoryService.createCategory(data);
            return res.status(201).json(category);
        }

        // Check if the user is a seller
        if (role === 'seller' && store) {
            // Sellers can create category only in their own store
            data.store = store;
            const category = await categoryService.createCategory(data);
            return res.status(201).json(category);
        }

        // If the user is not an admin or seller with a store, deny access
        res.status(403).json({ message: 'You are not authorized to create a category' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a category by ID
export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category by ID
export const updateCategory = admin(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const newData = req.body;

        // Validate the request body against the Joi schema
        const { error } = categorySchema.validate(newData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedCategory = await categoryService.updateCategory(categoryId, newData);
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        // Check if the error is due to uniqueness constraint violation
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ message: 'Category name must be unique as a category already exist with such name' });
        }
        res.status(500).json({ message: error.message });
    }
});

// Delete a category by ID
export const deleteCategory = admin(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categoryService.deleteCategory(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
