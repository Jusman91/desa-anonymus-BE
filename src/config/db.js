import mongoose from 'mongoose';

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
	}
};

export default connectToDB;
