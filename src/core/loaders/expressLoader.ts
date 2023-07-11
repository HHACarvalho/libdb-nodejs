import config from '../../../config';
import routes from '../../api';

import { CelebrateError } from 'celebrate';
import { JsonWebTokenError } from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

export default (expressApp: express.Application) => {
	// Middleware to handle cross-origin resource sharing
	expressApp.use(cors());

	// Middleware for req.cookies
	expressApp.use(cookieParser());

	// Middleware for req.body
	expressApp.use(bodyParser.json());

	// Load all routes
	expressApp.use(config.apiPrefix, routes());

	// Status check
	expressApp.get('/status', (req, res) => {
		res.status(200).json('Ok');
	});

	// Route not found
	expressApp.use((req, res) => {
		res.status(404).json('Route not found');
	});

	// Error handling
	expressApp.use((err, req, res, next) => {
		if (err instanceof CelebrateError) {
			res.status(400);
			res.json('Celebrate: ' + err.details.get('body').details[0].message);
		} else if (err instanceof JsonWebTokenError) {
			res.json('JWT: ' + err.message);
		} else {
			res.status(500);
			res.json(err.message);
		}
		next();
	});
};
