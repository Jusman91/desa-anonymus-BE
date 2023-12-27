import * as Yup from 'yup';
import { createValidationSchema } from './createValidationSchema.js';

// User
const registerValidationSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.max(15, 'Username is up to 15 characters'),
	email: Yup.string()
		.email('Invalid email')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
});

const loginValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email')
		.required('Email is required'),
	password: Yup.string().required('Password is required'),
});

const updateUserValidationSchema = Yup.object().shape({
	username: Yup.string().max(
		15,
		'Username is up to 15 characters',
	),
	role: Yup.string().oneOf(
		['user', 'admin'],
		'Invalid role',
	),
});

export const validateRegisterBody = createValidationSchema(
	registerValidationSchema,
);
export const validateLoginBody = createValidationSchema(
	loginValidationSchema,
);
export const validateUpdateUserBody =
	createValidationSchema(updateUserValidationSchema);
// end of User

// Product
const createProductValidationSchema = Yup.object().shape({
	name: Yup.string()
		.required('Name is required')
		.min(3, 'Name must be at least 3 characters')
		.max(50, 'Name cannot exceed 50 characters'),
	price: Yup.number().required('Price is required'),
	category: Yup.string().required('Category is required'),
	contact: Yup.string()
		.required('Contact is required')
		.matches(
			/^\+(\d{1,4}[- ]?)?\d{10,15}$/,
			'Invalid contact format',
		), // star with + and min 10, max 15 e.g. +6212345678988
	description: Yup.string()
		.required('Description is required')
		.max(200, 'Description cannot exceed 200 characters'),
	thumbnail: Yup.string().required('Thumbnail is required'),
	location: Yup.string()
		.required('Location is required')
		.max(100, 'Location cannot exceed 100 characters'),
	inStock: Yup.boolean(),
});

const updateProductValidationSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, 'Name must be at least 3 characters')
		.max(50, 'Name cannot exceed 50 characters'),
	price: Yup.number(),
	category: Yup.string(),
	contact: Yup.string().matches(
		/^\+(\d{1,4}[- ]?)?\d{10,15}$/,
		'Invalid contact format',
	),
	description: Yup.string().max(
		200,
		'Description cannot exceed 200 characters',
	),
	thumbnail: Yup.string(),
	location: Yup.string().max(
		100,
		'Location cannot exceed 100 characters',
	),
	inStock: Yup.boolean(),
});

export const validateCreateProductBody =
	createValidationSchema(createProductValidationSchema);

export const validateUpdateProductBody =
	createValidationSchema(updateProductValidationSchema);
// end of Product

// Article

const createArticleValidationSchema = Yup.object().shape({
	title: Yup.string()
		.required('Title is required')
		.min(10, 'Title must be at least 10 characters')
		.max(50, 'Title cannot exceed 50 characters'),
	author: Yup.string()
		.required('Author is required')
		.min(3, 'Author must be at least 3 characters')
		.max(15, 'Author cannot exceed 15 characters'),
	description: Yup.string()
		.required('Description is required')
		.min(50, 'Description must be at least 50 characters')
		.max(200, 'Description cannot exceed 200 characters'),
	thumbnail: Yup.string().required('Thumbnail is required'),
	category: Yup.string().required('Category is required'),
	content: Yup.string().required('Content is required'),
	likes: Yup.array(),
});

const updateArticleValidationSchema = Yup.object().shape({
	title: Yup.string()
		.min(10, 'Title must be at least 10 characters')
		.max(50, 'Title cannot exceed 50 characters'),
	author: Yup.string()
		.min(3, 'Author must be at least 3 characters')
		.max(15, 'Author cannot exceed 15 characters'),
	description: Yup.string()
		.min(50, 'Description must be at least 50 characters')
		.max(200, 'Description cannot exceed 200 characters'),
	thumbnail: Yup.string(),
	category: Yup.string(),
	content: Yup.string(),
	likes: Yup.array(),
});

export const validateCreateArticleBody =
	createValidationSchema(createArticleValidationSchema);

export const validateUpdateArticleBody =
	createValidationSchema(updateArticleValidationSchema);
// end of Article
