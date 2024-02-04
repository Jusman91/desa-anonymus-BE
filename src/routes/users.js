import express from 'express';
import {
	verifyAdmin,
	verifyToken,
	verifyUser,
} from '../middleware/verifyToken.js';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getOneUser,
	getUserLogged,
	updateUser,
	uploadProfilePic,
} from '../controllers/user.js';
import { multerImage } from '../middleware/multerImage.js';

const router = express.Router();

router.get('/me', verifyToken, getUserLogged);
router.post('/', verifyAdmin, createUser);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getOneUser);
router.get('/', verifyUser, getAllUsers);
router.put(
	'/profile_pic/:id',
	verifyUser,
	multerImage,
	uploadProfilePic,
);

export default router;
