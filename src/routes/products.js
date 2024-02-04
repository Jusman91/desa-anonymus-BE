import express from 'express';
import {
	verifyAdmin,
	verifyUser,
} from '../middleware/verifyToken.js';
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getOneProduct,
	getProductStatistics,
	updateProduct,
	updateProductThumbnail,
	uploadProductThumbnail,
} from '../controllers/product.js';
import { multerImage } from '../middleware/multerImage.js';

const router = express.Router();

router.post('/', verifyAdmin, createProduct);
router.put('/:id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);
router.get(
	'/statistics',
	verifyAdmin,
	getProductStatistics,
);
router.get('/:id', verifyUser, getOneProduct);
router.get('/', verifyUser, getAllProducts);
router.post(
	'/thumbnail',
	verifyAdmin,
	multerImage,
	uploadProductThumbnail,
);
router.put(
	'/thumbnail/:id',
	verifyAdmin,
	multerImage,
	updateProductThumbnail,
);

export default router;
