import mongoose from 'mongoose';

const categoriesProductSchema = new mongoose.Schema({
	name: String,
});

const dataCategories = [
	{ name: 'makanan' },
	{ name: 'kendaraan' },
	{ name: 'elektronik' },
	{ name: 'pertanian' },
	{ name: 'perikanan' },
	{ name: 'mesin' },
	{ name: 'olahraga' },
	{ name: 'hewan' },
	{ name: 'seni' },
	{ name: 'campuran' },
];

const CategoriesProduct = mongoose.model(
	'category_product',
	categoriesProductSchema,
);

// const saveCategoriesProduct = async (data) => {
// 	try {
// 		for (const category of data) {
// 			const existingCategory =
// 				await CategoriesProduct.findOne({
// 					name: category.name,
// 				});
// 			if (existingCategory) {
// 				await CategoriesProduct.updateMany(
// 					{ name: category.name },
// 					category,
// 				);
// 				console.log(
// 					`Data category dengan nama ${category.name} berhasil diperbarui`,
// 				);
// 			} else {
// 				await CategoriesProduct.create(category);
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

// saveCategoriesProduct(dataCategories);

export default CategoriesProduct;
