import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDB from './config/db.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import articlesRoutes from './routes/articles.js';
import productsRoutes from './routes/products.js';
import categoriesRouter from './routes/categories.js';

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Origin',
		'http://localhost:5173',
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});
const v1 = '/api/desa-anonymus/v1';

app.use(`${v1}/auth`, authRoutes);
app.use(`${v1}/users`, usersRoutes);
app.use(`${v1}/categories`, categoriesRouter);
app.use(`${v1}/articles`, articlesRoutes);
app.use(`${v1}/products`, productsRoutes);

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
