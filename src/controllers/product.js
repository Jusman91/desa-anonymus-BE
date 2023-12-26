import Product from '../models/Product.js';
import { createError } from '../middleware/error.js';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';

export const createProduct = async (req, res, next) => {
	const newProduct = new Product(req.body);
	try {
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		next(error);
	}
};

export const updateProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		if (!updatedProduct)
			return next(createError(404, 'Product not found'));

		res.status(200).json(updatedProduct);
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	const { id } = req.params;
	try {
		const product = await Product.findByIdAndDelete(id);
		if (!product)
			return next(createError(404, 'Product not found'));

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
			.sort(sortBy);
		exec();

		const totalProducts = await Product.countDocuments(
			combineQuery,
		);
		const pageCount = Math.ceil(totalProducts / limit);

		res.status(200).json({
			status: 'success',
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
