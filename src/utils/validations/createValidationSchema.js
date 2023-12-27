import { createError } from '../../middleware/error.js';

export const createValidationSchema =
	(schema) => async (data) => {
		try {
			await schema.validate(data, { abortEarly: false });
			return null; // Validasi sukses, tidak ada kesalahan
		} catch (error) {
			// output message = message: { password: 'errorMessage', email: 'errorMessage', etc.}
			// const validationErrors = {};
			// error.inner.forEach((err) => {
			// 	validationErrors[err.path] = err.message;
			// });

			// output message = message: ['errorMessage1, errorMessage2']
			const validationErrors = [];
			error.inner.forEach((err) => {
				validationErrors.push(err.message);
			});

			throw createError(422, validationErrors); // 422 Unprocessable Entity
		}
	};
