import { createError } from '../middleware/error.js';
import User from '../models/User.js';
import {
	comparePassword,
	encrypPassword,
} from '../utils/encryption.js';
import { generateAccessToken } from '../utils/generateToken.js';
import {
	validateLoginBody,
	validateRegisterBody,
} from '../utils/validations/reqBodyValidaton.js';

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		await validateRegisterBody(req.body);
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
		res.status(201).json({
			message: 'User created successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		await validateLoginBody(req.body);
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return next(createError(404, 'User does not exist'));

		await comparePassword(password, existingUser.password);

		const accessToken = generateAccessToken({
			id: existingUser._id,
			role: existingUser.role,
		});
		res.status(200).json({
			message: 'Login successful',
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};
