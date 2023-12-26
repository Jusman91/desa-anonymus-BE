import User from '../models/User.js';
import { createError } from '../middleware/error.js';
import bcrypt from 'bcryptjs';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';

export const createUser = async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return next(createError(400, 'Email already exists'));

		const hashedPassword = await bcrypt.hash(password, 12);
		await User.create({
			firstName,
			lastName,
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

export const updateUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		if (!updatedUser)
			return next(createError(404, 'User not found'));

		res
			.status(200)
			.json({ message: 'Updated user successfully' });
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
		const user = await User.findById(id).select('password');
		if (!user)
			return next(createError(404, 'User not found'));

		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const getAllUsers = async (req, res, next) => {
	const fields = ['firstName', 'lastName', 'email'];
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
			status: 'success',
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
