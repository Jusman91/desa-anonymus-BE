import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxLength: 50,
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
			maxLength: 200,
		},
		thumbnail: {
			type: String,
			require: true,
		},
		location: {
			type: String,
			required: true,
			maxLength: 100,
		},
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.model('product', ProductSchema);
