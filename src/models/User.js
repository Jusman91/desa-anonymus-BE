import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'pelase add your first name'],
			maxLength: [10, 'your name is up to 10 chars long'],
		},
		lastName: {
			type: String,
			required: [true, 'pelase add your last name'],
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
			default: 'user',
		},
		type: {
			type: String,
			default: 'normal',
		},
	},
	{ timestamps: true },
);

export default mongoose.model('user', UserSchema);
