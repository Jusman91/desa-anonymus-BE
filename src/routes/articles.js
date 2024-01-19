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
	updateArticleThumbnail,
	uploadArticleThumbnail,
} from '../controllers/article.js';
import { uploadFile } from '../middleware/uploadFileImage.js';

const router = express.Router();

router.post('/', verifyAdmin, createArticle);
router.put('/:id', verifyAdmin, updateArticle);
router.delete('/:id', verifyAdmin, deleteArticle);
router.get('/:id', verifyUser, getOneArticle);
router.get('/', verifyUser, getAllArticles);
router.post(
	'/upload_thumbnail',
	verifyAdmin,
	uploadFile,
	uploadArticleThumbnail,
);
router.put(
	'/upload_thumbnail/:id',
	verifyAdmin,
	uploadFile,
	updateArticleThumbnail,
);

export default router;
