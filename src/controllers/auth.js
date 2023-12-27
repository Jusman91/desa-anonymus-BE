import { createError } from '../middleware/error.js';
import User from '../models/User.js';
import {
	comparePassword,
	encrypPassword,
} from '../utils/encryption.js';
import { generateAccessToken } from '../utils/generateToken.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return next(createError(400, 'Email already exists'));

		const { hashedPassword } = await encrypPassword(
			password,
		);

		await User.create({
			username,
			email,
			password: hashedPassword,
		});
		res
			.status(201)
			.json({ message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return next(createError(404, 'User does not exist'));

		const { isPasswordValid } = await comparePassword(
			password,
			existingUser.password,
		);
		if (!isPasswordValid)
			return next(createError(400, 'Invalid password'));

		const accessToken = generateAccessToken({
			id: existingUser._id,
			role: existingUser.role,
		});
		res.status(200).json({
			message: 'success',
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};

export const getUserLogged = async (req, res, next) => {
	try {
		const { id } = req.user;
		const user = await User.findById(id).select(
			'-password',
		);
		if (!user)
			return next(createError(404, 'User not found'));
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
