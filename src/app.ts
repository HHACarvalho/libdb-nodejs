import 'reflect-metadata';

import config from '../config';
import Logger from './core/loaders/loggerLoader';

import express from 'express';

async function startServer() {
	const app = express();

	await require('./core/loaders').default(app);

	app
		.listen(config.apiPort, () => {
			Logger.info(`Now listening on: http://localhost:${config.apiPort}`);
		})
		.on('error', (err) => {
			Logger.error(err);
			process.exit(1);
		});
}

startServer();
