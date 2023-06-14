import 'reflect-metadata';

import config from '../config';
import Logger from './core/loaders/loggerLoader';

import express from 'express';

async function startServer() {
	const app = express();

	await require('./core/loaders').default(app);

	app.listen(config.apiPort, () => {
		Logger.info(
			`\n===========================\n= Listening on port: ${config.apiPort} =\n===========================\n`
		);
	}).on('error', (err) => {
		Logger.error(err);
		process.exit(1);
	});
}

startServer();
