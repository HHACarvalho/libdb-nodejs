import config from '../../../config';
import routes from '../../api';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

export default (expressApp: express.Application) => {
	// Enable Cross Origin Resource Sharing to all origins by default
	expressApp.use(cors());

	// Parses req.body into json
	expressApp.use(bodyParser.json());

	// Load all routes
	expressApp.use(config.apiPrefix, routes());

	// Status check
	expressApp.get('/status', (req, res) => {
		res.status(200).json('Ok');
	});

	// Route not found
	expressApp.use((req, res, next) => {
		res.status(404).json('Route not found');
	});

	// Error handling
	expressApp.use((err, req, res, next) => {
		res.status(500).json(err.message);
	});
};
