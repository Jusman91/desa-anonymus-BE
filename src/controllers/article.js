import Article from '../models/Article.js';
import { createError } from '../middleware/error.js';
import {
	buildPagination,
	buildSearchQuery,
	buildSortQuery,
} from '../utils/queries.js';
import { validateArticleBody } from '../utils/validations/reqBodyValidaton.js';
import mongoose from 'mongoose';
import { deleteImage } from '../utils/storageImage.js';
import {
	updateFileImage,
	uploadFileImage,
} from '../middleware/fileImage.js';
import { extractImageUrls } from '../utils/cheerioUtil.js';

export const createArticle = async (req, res, next) => {
	try {
		await validateArticleBody(req.body);
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
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Article not found'));

		await validateArticleBody(req.body);

		const existingArticle = await Article.findById(id);

		if (!existingArticle)
			return next(createError(404, 'Article not found'));

		await handleImageUpdates(
			existingArticle,
			req.body.content,
		);

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
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Article not found'));

		const existingArticle = await Article.findById(id);

		if (!existingArticle)
			return next(createError(404, 'Article not found'));

		await deleteArticleResources(existingArticle);

		await Article.findByIdAndDelete(id);

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
		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Article not found'));

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

export const uploadArticleThumbnail = async (
	req,
	res,
	next,
) => {
	try {
		const folderName = 'article-thumbnail';
		await uploadFileImage({ req, res, next, folderName });
	} catch (error) {
		next(error);
	}
};

export const updateArticleThumbnail = async (
	req,
	res,
	next,
) => {
	const { id } = req.params;
	try {
		const folderName = 'article-thumbnail';

		if (!mongoose.Types.ObjectId.isValid(id))
			return next(createError(404, 'Article not found'));

		const existingData = await Article.findById(id);

		if (!existingData)
			return next(createError(404, 'Article not found'));
		const oldDataImgURL = existingData.thumbnail;

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

export const uploadArticleImgContent = async (
	req,
	res,
	next,
) => {
	try {
		const folderName = 'article-content-img';
		await uploadFileImage({ req, res, next, folderName });
	} catch (error) {
		next(error);
	}
};

const handleImageUpdates = async (
	existingArticle,
	newContent,
) => {
	const oldContentImgURLs = extractImageUrls(
		existingArticle.content,
	);
	const newContentImgURLs = extractImageUrls(newContent);

	// Bandingkan konten artikel sebelum dan setelah pembaruan
	const imagesToDelete = oldContentImgURLs?.filter(
		(oldImgURL) => !newContentImgURLs.includes(oldImgURL),
	);

	// Hapus gambar-gambar yang tidak lagi digunakan dari Firebase Storage
	if (imagesToDelete) {
		await Promise.all(imagesToDelete.map(deleteImage));
	}
};

const deleteArticleResources = async (article) => {
	const { thumbnail, content } = article;

	await deleteImageIfExists(thumbnail);

	const imageUrls = extractImageUrls(content);

	await Promise.all(imageUrls.map(deleteImageIfExists));
};

const deleteImageIfExists = async (imageUrl) => {
	if (imageUrl) {
		await deleteImage(imageUrl);
	}
};
