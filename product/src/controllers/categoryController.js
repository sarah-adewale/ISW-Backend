import * as categoryService from '../services/categoryService.js';
import Joi from 'joi';

// Define a Joi schema for category data validation
const categorySchema = Joi.object({
    name: Joi.string(),
    description: Joi.string()
});

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
export const createCategory = async (req, res) => {
    try {
        // Validate the request body against the Joi schema
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        // Check if the error is due to uniqueness constraint violation
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) {
            return res.status(400).json({ message: 'Category name must be unique as a category already exist with such name' });
        }
        res.status(400).json({ message: error.message });
    }
};

// Get a category by ID
export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        console.log(req.params);
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
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        console.log(req.params);
        const newData = req.body;

        // Validate the request body against the Joi schema
        const { error } = categorySchema.validate(newData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedCategory = await categoryService.updateCategory(categoryId, newData);
        console.log(updatedCategory);
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
};
// Delete a category by ID
export const deleteCategory = async (req, res) => {
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
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};