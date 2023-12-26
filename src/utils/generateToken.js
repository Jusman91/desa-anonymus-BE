import jwt from 'jsonwebtoken';

export const accessToken = (payload) => {
	return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
		expiresIn: '1d',
	});
};
