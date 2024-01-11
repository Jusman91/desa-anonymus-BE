import User from '../models/User.js';
import { createError } from '../middleware/error.js';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';
import { encrypPassword } from '../utils/encryption.js';
import {
	validateRegisterBody,
	validateUpdateUserBody,
} from '../utils/validations/reqBodyValidaton.js';

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

export const createUser = async (req, res, next) => {
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

export const updateUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		await validateUpdateUserBody(req.body);
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		if (!updatedUser)
			return next(createError(404, 'User not found'));

		res.status(200).json({
			message: 'Updated user successfully',
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await User.findByIdAndDelete(id);
		if (!user)
			return next(createError(404, 'User not found'));

		res
			.status(200)
			.json({ message: 'User has been deleted' });
	} catch (error) {
		next(error);
	}
};

export const getOneUser = async (req, res, next) => {
	const { id } = req.params;
	try {
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

export const getAllUsers = async (req, res, next) => {
	const fields = ['username', 'email'];
	const combineQuery = buildSearchQuery(req, fields);
	const sortBy = buildSortQuery(req);
	const { page, limit, skip } = buildPagination(req);
	try {
		const users = await User.find(combineQuery)
			.select('-password')
			.skip(skip)
			.limit(limit)
			.sort(sortBy)
			.exec();

		const totalUsers = await User.countDocuments(
			combineQuery,
		);
		const pageCount = Math.ceil(totalUsers / limit);

		res.status(200).json({
			data: users,
			totalData: totalUsers,
			page,
			pageCount,
			limit,
		});
	} catch (error) {
		next(error);
	}
};
