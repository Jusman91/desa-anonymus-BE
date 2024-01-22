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
	updateProduct,
	updateProductThumbnail,
	uploadProductThumbnail,
} from '../controllers/product.js';
import { uploadFile } from '../middleware/uploadFileImage.js';
const router = express.Router();

router.post('/', verifyAdmin, createProduct);
router.put('/:id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);
router.get('/:id', verifyUser, getOneProduct);
router.get('/', verifyUser, getAllProducts);
router.post(
	'/upload_thumbnail',
	verifyAdmin,
	uploadFile,
	uploadProductThumbnail,
);
router.post(
	'/upload_thumbnail/:id',
	verifyAdmin,
	uploadFile,
	updateProductThumbnail,
);

export default router;
