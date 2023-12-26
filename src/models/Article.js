import mongoose from 'mongoose';

const ArticleSchmea = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: 10,
			maxLength: 50,
		},
		author: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 15,
		},
		description: {
			type: String,
			required: true,
			minLength: 50,
			maxLength: 200,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		category: {
			type: [String],
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

export default mongoose.model('article', ArticleSchmea);
