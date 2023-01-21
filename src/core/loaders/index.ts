import config from '../../../config';
import Logger from './loggerLoader';
import dependencyLoader from './dependencyLoader';
import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader';

import express from 'express';

export default async (expressApp: express.Application) => {
	await mongooseLoader();
	Logger.info('MongoDB connected and loaded!');

	await dependencyLoader({
		controllers: Object.values(config.controllers),
		services: Object.values(config.services),
		repos: Object.values(config.repos),
		schemas: Object.values(config.schemas),
	});
	Logger.info('Controllers, Services, Repos and Schemas loaded!');

	await expressLoader(expressApp);
	Logger.info('Express loaded!');
};
