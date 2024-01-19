import Product from '../models/Product.js';
import { createError } from '../middleware/error.js';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';
import {
	validateCreateProductBody,
	validateUpdateProductBody,
} from '../utils/validations/reqBodyValidaton.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res, next) => {
	try {
		await validateCreateProductBody(req.body);
		await Product.create(req.body);
		res
			.status(201)
			.json({ message: 'Product created successfully' });
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Product not found'));

		await validateUpdateProductBody(req.body);

		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		if (!updatedProduct)
			return next(createError(404, 'Product not found'));

		res
			.status(200)
			.json({ message: 'Product updated successfully' });
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Product not found'));

		const existingProduct = Product.findById(id);

		if (!existingProduct)
			return next(createError(404, 'Product not found'));

		const oldProductThumbnailURL =
			existingProduct.thumbnail;

		if (oldProductThumbnailURL) {
			deleteImage(oldProductThumbnailURL);
		}

		await Product.findByIdAndDelete(id);

		res
			.status(200)
			.json({ message: 'Product has been deleted' });
	} catch (error) {
		next(error);
	}
};

export const getOneProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Product not found'));

		const product = await Product.findById(id);

		if (!product)
			return next(createError(404, 'Product not found'));

		res.status(200).json(Product);
	} catch (error) {
		next(error);
	}
};

export const getAllProducts = async (req, res, next) => {
	const fields = ['name', 'category'];
	const combineQuery = buildSearchQuery(req, fields);
	const sortBy = buildSortQuery(req);
	const { page, limit, skip } = buildPagination(req);
	try {
		const products = await Product.find(combineQuery)
			.skip(skip)
			.limit(limit)
			.sort(sortBy)
			.exec();

		const totalProducts = await Product.countDocuments(
			combineQuery,
		);
		const pageCount = Math.ceil(totalProducts / limit);

		res.status(200).json({
			data: products,
			totalData: totalProducts,
			page,
			pageCount,
			limit,
		});
	} catch (error) {
		next(error);
	}
};

export const uploadProductThumbnail = async (
	req,
	res,
	next,
) => {
	try {
		const folderName = 'product-thumbnail';
		const originalName = req.file.originalname;
		const mimeType = req.file.mimetype;
		const fileBuffer = req.file.buffer;

		const downloadURL = await sendImage({
			folderName,
			originalName,
			mimeType,
			fileBuffer,
		});
		res.status(201).json(downloadURL);
	} catch (error) {
		next(error);
	}
};

export const updateProductThumbnail = async (
	req,
	res,
	next,
) => {
	const { id } = req.params;
	try {
		const folderName = 'product-thumbnail';
		const originalName = req.file.originalname;
		const mimeType = req.file.mimetype;
		const fileBuffer = req.file.buffer;

		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Product not found'));

		const existingProduct = await Product.findById(id);

		if (!existingProduct)
			return next(createError(404, 'Product not found'));
		const oldProductThumbnailURL =
			existingProduct.thumbnail;

		if (oldProductThumbnailURL) {
			deleteImage(oldProductThumbnailURL);
		}

		const downloadURL = await sendImage({
			folderName,
			originalName,
			mimeType,
			fileBuffer,
		});
		res.status(201).json(downloadURL);
	} catch (error) {
		next(error);
	}
};
