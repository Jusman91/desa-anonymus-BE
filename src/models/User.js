import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'pelase add your first name'],
			maxLength: [10, 'your name is up to 10 chars long'],
		},
		email: {
			type: String,
			required: [true, 'please add your email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'please add your password'],
		},
		profilePic: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
	},
	{ timestamps: true },
);

export default mongoose.model('user', UserSchema);
