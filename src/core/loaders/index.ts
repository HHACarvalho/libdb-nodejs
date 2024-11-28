import dependencyLoader from './dependencyLoader';
import expressLoader from './expressLoader';
import mongooseLoader from './mongooseLoader';

export default async (expressApp) => {
	await mongooseLoader();

	await dependencyLoader();

	await expressLoader(expressApp);
};
