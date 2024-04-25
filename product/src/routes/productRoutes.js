// routes/productRoutes.js

import express from 'express';
import * as productController from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(protect, productController.createProduct)
  .delete(protect, admin, productController.deleteProduct);
router
  .route('/:id')
  .get(productController.getProductById)
  .put(protect, productController.updateProduct);

export default router;
