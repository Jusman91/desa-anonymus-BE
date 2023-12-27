import express from 'express';
import {
	getUserLogged,
	login,
	register,
} from '../controllers/auth.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getUserLogged);

export default router;
