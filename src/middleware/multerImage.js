import multer from 'multer';
import { createError } from './error.js';

export const multerImage = (req, res, next) => {
	const uploader = multer({
		storage: multer.memoryStorage(),
		limits: {
			fileSize: 1 * 1024 * 1024, // keep images size <= 1 MB
		},
		fileFilter: (req, file, cb) => {
			const allowedTypes = [
				'image/jpeg',
				'image/png',
				'image/jpg',
			];
			if (allowedTypes.includes(file.mimetype)) {
				cb(null, true);
			} else {
				return cb(
					next(
						createError(
							415,
							'Unsupported Media Type, Invalid file format.',
						),
					),
				);
			}
		},
	});

	uploader.single('file')(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return next(
				createError(
					400,
					`An error occurred while uploading the file. ${err.message}`,
				),
			);
		} else if (err) {
			return next(
				createError(
					400,
					`An error occurred while uploading the file. ${err.message}`,
				),
			);
		}

		next();
	});
};
