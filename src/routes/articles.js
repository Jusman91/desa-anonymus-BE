import express from 'express';
import {
	verifyAdmin,
	verifyUser,
} from '../middleware/verifyToken.js';
import {
	createArticle,
	deleteArticle,
	getAllArticles,
	getOneArticle,
	updateArticle,
} from '../controllers/article.js';

const router = express.Router();

router.post('/', verifyAdmin, createArticle);
router.put('/:id', verifyAdmin, updateArticle);
router.delete('/:id', verifyAdmin, deleteArticle);
router.get('/:id', verifyUser, getOneArticle);
router.get('/', verifyUser, getAllArticles);

export default router;
