import express from 'express';
import { getCategoriesProduct } from '../controllers/categories.js';

const router = express.Router();

router.get('/product', getCategoriesProduct);

export default router;
