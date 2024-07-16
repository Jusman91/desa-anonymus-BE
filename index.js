import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDB from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import usersRoutes from './src/routes/users.js';
import articlesRoutes from './src/routes/articles.js';
import productsRoutes from './src/routes/products.js';
import categoriesRouter from './src/routes/categories.js';

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
const v1 = '/api/desa-anonymus/v1';

app.use(`${v1}/auth`, authRoutes);
app.use(`${v1}/users`, usersRoutes);
app.use(`${v1}/categories`, categoriesRouter);
app.use(`${v1}/articles`, articlesRoutes);
app.use(`${v1}/products`, productsRoutes);

app.get('/', (req, res) => {
	res.send('Server is running');
});

// Handle errors
app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage =
		err.message || 'Something went wrong!';
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

// Server Listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	connectToDB();
	console.log(`Server is running on port ${PORT}`);
});
