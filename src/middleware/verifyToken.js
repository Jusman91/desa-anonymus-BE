import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
	const authHeader =
		req.headers.authorization || req.headers.Authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(
			token,
			process.env.TOKEN_SECRET_KEY,
			(err, decode) => {
				if (err)
					return next(
						createError(403, 'Token is not valid'),
					);
				req.user = decode;
				next();
			},
		);
	} else {
		return next(createError(401, 'Unauthorized'));
	}
};

export const verifyUser = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (
			req.user.id === req.params.id ||
			req.user.role === 'admin'
		) {
			next();
		} else {
			return next(
				createError(403, 'You are not authorized'),
			);
		}
	});
};

export const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, next, () => {
		if (req.user.role === 'admin') {
			next();
		} else {
			return next(
				createError(403, 'You are not authorized'),
			);
		}
	});
};
