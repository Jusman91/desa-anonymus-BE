import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			require: true,
		},
		location: {
			type: String,
			required: true,
		},
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const dataProducts = [
	{
		name: 'jual A',
		price: 10000,
		category: 'makanan',
		contact: '+6234242525111',
		description:
			'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		thumbnail:
			'https://robohash.org/quieumsunt.png?size=50x50&set=set1',
		location: '3948 Talmadge Lane',
		inStock: false,
	},
	{
		name: 'jual B',
		price: 12345,
		category: 'outdoor',
		contact: '+6234242525424',
		description:
			'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
		thumbnail:
			'https://robohash.org/autemsuntdoloribus.png?size=50x50&set=set1',
		location: '434 Daystar Parkway',
		inStock: false,
	},
	{
		name: 'jual c',
		price: 3414,
		category: 'perikanan',
		contact: '+623433555535',
		description:
			'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
		thumbnail:
			'https://robohash.org/namexercitationemtempore.png?size=50x50&set=set1',
		location: '22639 Dahle Hill',
		inStock: false,
	},
	{
		name: 'jual D',
		price: 16200,
		category: 'antik',
		contact: '511-527-6038',
		description:
			'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
		thumbnail:
			'https://robohash.org/animiomnisfugiat.png?size=50x50&set=set1',
		location: '273 Kipling Hill',
		inStock: true,
	},
	{
		name: 'kapal nelayan',
		price: 18000000,
		category: 'perikanan',
		contact: '+622425266233',
		description:
			'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
		thumbnail:
			'https://robohash.org/perferendisetsunt.png?size=50x50&set=set1',
		location: '55998 Pennsylvania Park',
		inStock: false,
	},
	{
		name: 'sapi madura',
		price: 15500000,
		category: 'hewan',
		contact: '+623896234687',
		description:
			'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
		thumbnail:
			'https://robohash.org/autipsamquasi.png?size=50x50&set=set1',
		location: '94 Canary Avenue',
		inStock: false,
	},
	{
		name: 'kambing',
		price: 1750000,
		category: 'hewan',
		contact: '+623274248944',
		description:
			'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
		thumbnail:
			'https://robohash.org/nullaasperioreseveniet.png?size=50x50&set=set1',
		location: '18 Lake View Circle',
		inStock: false,
	},
	{
		name: 'pukat',
		price: 120000,
		category: 'perikanan',
		contact: '+623523425323',
		description:
			'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor',
		thumbnail:
			'https://robohash.org/dolorrerumlabore.png?size=50x50&set=set1',
		location: '3 Victoria Parkway',
		inStock: false,
	},
	{
		name: 'motor beat',
		price: 2580000,
		category: 'kendaraan',
		contact: '+623525274224',
		description:
			'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
		thumbnail:
			'https://robohash.org/ducimusdoloremeum.png?size=50x50&set=set1',
		location: '00 Johnson Road',
		inStock: false,
	},
	{
		name: 'mesin kapal 16pk',
		price: 3500000,
		category: 'mesin',
		contact: '+622255342422',
		description:
			'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
		thumbnail:
			'https://robohash.org/consecteturestporro.png?size=50x50&set=set1',
		location: '2 Meadow Vale Hill',
		inStock: false,
	},
	{
		name: 'traktor',
		price: 1600000,
		category: 'pertanian',
		contact: '+623225252424',
		description:
			'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
		thumbnail:
			'https://robohash.org/odioetnecessitatibus.png?size=50x50&set=set1',
		location: '958 Anthes Hill',
		inStock: false,
	},
	{
		name: 'ikan bolu',
		price: 15000,
		category: 'perikanan',
		contact: '+623535352424',
		description:
			'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
		thumbnail:
			'https://robohash.org/oditodiounde.png?size=50x50&set=set1',
		location: '6972 Rusk Park',
		inStock: false,
	},
	{
		name: 'ikan nila',
		price: 25000,
		category: 'perikanan',
		contact: '+623242556456',
		description:
			'Maecenas ut massa quis augue luctus  molestie lorem. Quisque ut erat.',
		thumbnail:
			'https://robohash.org/etaccusantiumducimus.png?size=50x50&set=set1',
		location: '138 Village Green Circle',
		inStock: true,
	},
	{
		name: 'pupuk',
		price: 45000,
		category: 'pertanian',
		contact: '+624353643444',
		description:
			'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
		thumbnail:
			'https://robohash.org/quiarationesuscipit.png?size=50x50&set=set1',
		location: '05 Pepper Wood Crossing',
		inStock: true,
	},
];

const Product = mongoose.model('product', ProductSchema);

// const saveProductsData = async (data) => {
// 	try {
// 		for (const product of data) {
// 			const existingProduct = await Product.findOne({
// 				name: product.name,
// 			});
// 			if (existingProduct) {
// 				await Product.updateMany(
// 					{ name: product.name },
// 					product,
// 				);
// 				console.log(
// 					`Data Product dengan nama ${product.name} berhasil diperbarui`,
// 				);
// 			} else {
// 				await Product.create(product);
// 				console.log(
// 					`Data product dengan nama ${product.name} berhasil disimpan`,
// 				);
// 			}
// 		}
// 	} catch (error) {
// 		console.error(
// 			'Terjadi kesalahan saat menyimpan data product:',
// 			error,
// 		);
// 	}
// };

// saveProductsData(dataProducts);

export default Product;
