import routes from '../../api';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { z } from 'zod';

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
		res.cookie('backdoor', true, { httpOnly: true, maxAge: 30000 });
		res.send('Temporary administrator permissions granted');
	});

	// Unknown route
	expressApp.use((req, res) => {
		res.status(404);
		res.send('Route not found');
	});

	// Error handling
	expressApp.use((err: any, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof z.ZodError) {
			res.status(400);
			res.json({ error: err.errors[0].path.join('.') + ': ' + err.errors[0].message });
		} else if (err instanceof JsonWebTokenError) {
			res.status(400);
			res.json('JWT: ' + err.message);
		} else {
			res.status(500);
			res.json(err.message);
		}
		next();
	});
};
