import CategoriesProduct from '../models/CategoriesProduct.js';

export const getCategoriesProduct = async (
	req,
	res,
	next,
) => {
	try {
		const categories = await CategoriesProduct.find();
		res.status(200).json(categories);
	} catch (error) {
		next(error);
	}
};
