import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const connectToDB = async () => {
	const url = process.env.MONGO_URL;
	try {
		await mongoose.connect(url);
		console.log('Connect to the mongoDB successfully');
	} catch (error) {
		console.error(
			'could not connect to the database',
			error,
		);
		process.exit(1);
	}
};

export default connectToDB;
