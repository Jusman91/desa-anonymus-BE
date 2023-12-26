import Article from '../models/Article.js';
import { createError } from '../middleware/error.js';

export const createArticle = async (req, res, next) => {
	const newArticle = new Article(req.body);
	try {
		const savedArticle = await newArticle.save();
		res.status(201).json(savedArticle);
	} catch (error) {
		next(error);
	}
};

export const updateArticle = async (req, res, next) => {
	const { id } = req.params;
	try {
		const updatedArticle = await Article.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true },
		);

		if (!updatedArticle)
			return next(createError(404, 'Article not found'));

		res.status(200).json(updatedArticle);
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

		res.status(200).json(Article);
	} catch (error) {
		next(error);
	}
};

export const getAllArticles = async (req, res, next) => {
	try {
		const articles = await Article.find();
		res.status(200).json(articles);
	} catch (error) {
		next(error);
	}
};
