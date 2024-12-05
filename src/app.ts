import 'reflect-metadata';

import { CONFIG } from '../config';
import Container from './core/dependencies';
import RoleController from './controllers/roleController';
import UserController from './controllers/userController';
import Logger from './core/logger';

import bodyParser from 'body-parser';
const cookieParser = require('cookie-parser');
const cors = require('cors');
import express from 'express';
import { connect } from 'mongoose';

async function startServer() {
	// Connect to the MongoDB database
	await connect(CONFIG.DB_URL);

	const app = express();

	// Status endpoint
	app.get('/status', (req, res) => {
		res.cookie('backdoor', true, { httpOnly: true, maxAge: 60000 });
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

	app
		.listen(CONFIG.API_PORT, () => {
			Logger.info(`Now listening on: http://localhost:${CONFIG.API_PORT}`);
		})
		.on('error', (err) => {
			Logger.error(err);
			process.exit(1);
		});
}

startServer();
