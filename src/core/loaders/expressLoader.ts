import config from '../../../config';
import routes from '../../routes';

import bodyParser from 'body-parser';
import express from 'express';

export default (expressApp: express.Application) => {
	// Status check
	expressApp.get('/status', (req, res, next) => {
		res.status(200).json('Ok');
	});

	// Shows the real origin IP when behind a reverse proxy
	expressApp.enable('trust proxy');

	// Transforms the raw string of req.body into json
	expressApp.use(bodyParser.json());

	// Load all routes
	expressApp.use(config.apiPrefix, routes());

	// Route not found
	expressApp.use((req, res, next) => {
		res.status(404).json('Not found');
	});

	// Error handling
	expressApp.use((err, req, res, next) => {
		res.status(500).json(err.message);
	});
};
