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
} from '../controllers/product.js';
const router = express.Router();

router.post('/', verifyAdmin, createProduct);
router.put('/:id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);
router.get('/:id', verifyUser, getOneProduct);
router.get('/', verifyUser, getAllProducts);

export default router;
