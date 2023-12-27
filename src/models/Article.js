import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		likes: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'user',
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model('article', ArticleSchema);
