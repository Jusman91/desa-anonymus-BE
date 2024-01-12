import express from 'express';
import {
	getCategoriesArticle,
	getCategoriesProduct,
} from '../controllers/categories.js';

const router = express.Router();

router.get('/product', getCategoriesProduct);
router.get('/article', getCategoriesArticle);

export default router;
