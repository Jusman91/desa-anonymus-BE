import bcrypt from 'bcryptjs';

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
	return { isPasswordValid };
};
