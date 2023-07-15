import routes from '../../api';

import { CelebrateError } from 'celebrate';
import { Application } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export default (expressApp: Application) => {
	// Middleware for req.body
	expressApp.use(bodyParser.json());

	// Middleware for req.cookies
	expressApp.use(cookieParser());

	// Middleware to handle cross-origin resource sharing
	expressApp.use(cors());

	// Load all routes
	expressApp.use(routes());

	// Status check
	expressApp.get('/status', (req, res) => {
		res.status(200);
		res.send('Ok');
	});

	// Unknown route
	expressApp.use((req, res) => {
		res.status(404);
		res.send('Route not found');
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
