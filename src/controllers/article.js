import Article from '../models/Article.js';
import { createError } from '../middleware/error.js';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';
import {
	validateCreateArticleBody,
	validateUpdateArticleBody,
} from '../utils/validations/reqBodyValidaton.js';

export const createArticle = async (req, res, next) => {
	try {
		await validateCreateArticleBody(req.body);
		await Article.create(req.body);
		res
			.status(201)
			.json({ message: 'Created article successfully' });
	} catch (error) {
		next(error);
	}
};

export const updateArticle = async (req, res, next) => {
	const { id } = req.params;
	try {
		await validateUpdateArticleBody(req.body);
		const updatedArticle = await Article.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		if (!updatedArticle)
			return next(createError(404, 'Article not found'));

		res
			.status(200)
			.json({ message: 'Updated article successfully' });
	} catch (error) {
		next(error);
	}
};

export const deleteArticle = async (req, res, next) => {
	const { id } = req.params;
	try {
		const article = await Article.findByIdAndDelete(id);
		if (!article)
			return next(createError(404, 'Article not found'));

		res
			.status(200)
			.json({ message: 'Article has been deleted' });
	} catch (error) {
		next(error);
	}
};

export const getOneArticle = async (req, res, next) => {
	const { id } = req.params;
	try {
		const article = await Article.findById(id);
		if (!article)
			return next(createError(404, 'Article not found'));

		res.status(200).json(article);
	} catch (error) {
		next(error);
	}
};

export const getAllArticles = async (req, res, next) => {
	const fields = ['title', 'author', 'category'];
	const combineQuery = buildSearchQuery(req, fields);
	const sortBy = buildSortQuery(req);
	const { page, limit, skip } = buildPagination(req);
	try {
		const articles = await Article.find(combineQuery)
			.skip(skip)
			.limit(limit)
			.sort(sortBy)
			.exec();

		const totalArticles = await Article.countDocuments(
			combineQuery,
		);
		const pageCount = Math.ceil(totalArticles / limit);

		res.status(200).json({
			data: articles,
			totalData: totalArticles,
			page,
			pageCount,
			limit,
		});
	} catch (error) {
		next(error);
	}
};
