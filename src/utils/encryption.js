import bcrypt from 'bcryptjs';
import { createError } from '../middleware/error.js';

export const encrypPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return { hashedPassword };
};

export const comparePassword = async (
	password,
	existPassword,
) => {
	const isPasswordValid = await bcrypt.compare(
		password,
		existPassword,
	);
	if (!isPasswordValid)
		throw createError(400, 'Invalid password');
};
