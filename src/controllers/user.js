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
import {
	deleteImage,
	sendImage,
} from '../utils/storageImage.js';
import mongoose from 'mongoose';
import { updateFileImage } from '../middleware/fileImage.js';

export const getUserLogged = async (req, res, next) => {
	try {
		const { id } = req.user;
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'User not allowed'));
		const user = await User.findById(id).select(
			'-password',
		);
		if (!user)
			return next(createError(404, 'User not allowed'));
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req, res, next) => {
	const { username, email, password, role } = req.body;
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
			role,
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
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'User not found'));

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
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'User not found'));

		const existingUser = await User.findById(id);
		if (!existingUser)
			return next(createError(404, 'User not found'));

		const oldURL = existingUser.profilePic;
		if (oldURL) {
			deleteImage(oldURL);
		}

		await User.findByIdAndDelete(id);

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
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'User not found'));

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

export const uploadProfilePic = async (req, res, next) => {
	const { id } = req.params;
	try {
		const folderName = 'user-profile';

		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'User not found'));

		const existingUser = await User.findById(id);

		if (!existingUser)
			return next(createError(404, 'User not found'));

		const oldDataImgURL = existingUser.profilePic;

		await updateFileImage({
			req,
			res,
			next,
			folderName,
			oldDataImgURL,
		});
	} catch (error) {
		next(error);
	}
};
