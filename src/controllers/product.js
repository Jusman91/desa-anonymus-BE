import Product from '../models/Product.js';
import { createError } from '../middleware/error.js';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';
import { validateProductBody } from '../utils/validations/reqBodyValidaton.js';
import mongoose from 'mongoose';
import { deleteImage } from '../utils/storageImage.js';
import {
	updateFileImage,
	uploadFileImage,
} from '../middleware/fileImage.js';
import { aggregateCountByMonth } from '../utils/aggregateCountByMonth.js';

export const createProduct = async (req, res, next) => {
	try {
		await validateProductBody(req.body);

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

		await validateProductBody(req.body);

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

		res.status(200).json(product);
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
		await uploadFileImage({ req, res, next, folderName });
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

		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Product not found'));

		const existingProduct = await Product.findById(id);

		if (!existingProduct)
			return next(createError(404, 'Product not found'));
		const oldDataImgURL = existingProduct.thumbnail;

		await updateFileImage({
			req,
			res,
			next,
			oldDataImgURL,
			folderName,
		});
	} catch (error) {
		next(error);
	}
};

export const getProductStatistics = async (
	req,
	res,
	next,
) => {
	try {
		const totalData = await Product.countDocuments();

		const newDataCountPerMonth =
			await aggregateCountByMonth(Product);

		res.status(200).json({
			totalData,
			newDataCountPerMonth,
		});
	} catch (error) {
		next(error);
	}
};
