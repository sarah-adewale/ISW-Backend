import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(categoryController.getAllCategories).post(protect, admin, categoryController.createCategory);
router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .put(protect, admin, categoryController.updateCategory)
  .delete(protect, admin, categoryController.deleteCategory);
router.get('/:id/products', categoryController.getProductsByCategory);

export default router;
