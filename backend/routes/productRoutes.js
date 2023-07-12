import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts); // get all products
router.get('/:id', getProductById); // get single product
router.post('/', protect, admin, createProduct); // create product
router.post('/:id/reviews', protect, createProductReview); // create new review
router.put('/:id', protect, admin, updateProduct); // update product
router.delete('/:id', protect, admin, deleteProduct); // delete product

export default router;
