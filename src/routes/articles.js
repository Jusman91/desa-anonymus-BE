import express from 'express';
import {
	verifyAdmin,
	verifyUser,
} from '../middleware/verifyToken.js';
import {
	createArticle,
	deleteArticle,
	getAllArticles,
	getArticleStatistics,
	getOneArticle,
	updateArticle,
	updateArticleThumbnail,
	uploadArticleImgContent,
	uploadArticleThumbnail,
} from '../controllers/article.js';
import { multerImage } from '../middleware/multerImage.js';

const router = express.Router();

router.post('/', verifyAdmin, createArticle);
router.put('/:id', verifyAdmin, updateArticle);
router.delete('/:id', verifyAdmin, deleteArticle);
router.get(
	'/statistics',
	verifyAdmin,
	getArticleStatistics,
);
router.get('/:id', verifyUser, getOneArticle);
router.get('/', verifyUser, getAllArticles);
router.post(
	'/thumbnail',
	verifyAdmin,
	multerImage,
	uploadArticleThumbnail,
);
router.put(
	'/thumbnail/:id',
	verifyAdmin,
	multerImage,
	updateArticleThumbnail,
);
router.post(
	'/img_content',
	verifyAdmin,
	multerImage,
	uploadArticleImgContent,
);

export default router;
