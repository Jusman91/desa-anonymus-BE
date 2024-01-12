import mongoose from 'mongoose';

const categoriesArticleSchema = new mongoose.Schema({
	name: String,
});

const dataCategories = [
	{ name: 'pendidikan' },
	{ name: 'ekonomi' },
	{ name: 'budaya' },
	{ name: 'kesehatan' },
	{ name: 'lingkungan' },
	{ name: 'sosial' },
	{ name: 'seni' },
	{ name: 'pariwisata' },
	{ name: 'pemerintahan' },
];

const CategoriesArticle = mongoose.model(
	'category_article',
	categoriesArticleSchema,
);

// const saveCategoriesArticle = async (data) => {
// 	try {
// 		for (const category of data) {
// 			const existingCategory =
// 				await CategoriesArticle.findOne({
// 					name: category.name,
// 				});
// 			if (existingCategory) {
// 				await CategoriesArticle.updateMany(
// 					{ name: category.name },
// 					category,
// 				);
// 				console.log(
// 					`Data category dengan nama ${category.name} berhasil diperbarui`,
// 				);
// 			} else {
// 				await CategoriesArticle.create(category);
// 				console.log(
// 					`Data category dengan nama ${category.name} berhasil disimpan`,
// 				);
// 			}
// 		}
// 	} catch (error) {
// 		console.error(
// 			'Terjadi kesalahan saat menyimpan data categories:',
// 			error,
// 		);
// 	}
// };

// saveCategoriesArticle(dataCategories);

export default CategoriesArticle;
