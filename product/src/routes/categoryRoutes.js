import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
// import productRoutes from './productRoutes.js';
// import transactionRoutes from './transactionRoutes.js';

const router = express.Router();

// Routes for categories
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;
