import Logger from './loggerLoader';
import dependencyLoader from './dependencyLoader';
import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader';

export default async (expressApp) => {
	await mongooseLoader();
	Logger.info('MongoDB connected and loaded!');

	await dependencyLoader();
	Logger.info('Controllers, Services, Repos and Schemas loaded!');

	await expressLoader(expressApp);
	Logger.info('Express loaded!');
};
