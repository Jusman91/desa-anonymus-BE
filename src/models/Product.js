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

export default mongoose.model('product', ProductSchema);
