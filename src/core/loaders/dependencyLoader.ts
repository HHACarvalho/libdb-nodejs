import Logger from './loggerLoader';

import { Container } from 'typedi';

export default ({
	controllers,
	services,
	repos,
	schemas,
}: {
	controllers: { name: string; path: string }[];
	services: { name: string; path: string }[];
	repos: { name: string; path: string }[];
	schemas: { name: string; path: string }[];
}) => {
	try {
		schemas.forEach((e) => {
			const schema = require(e.path).default;
			Container.set(e.name, schema);
		});

		repos.forEach((e) => {
			const repoClass = require(e.path).default;
			const repoInstance = Container.get(repoClass);
			Container.set(e.name, repoInstance);
		});

		services.forEach((e) => {
			const serviceClass = require(e.path).default;
			const serviceInstance = Container.get(serviceClass);
			Container.set(e.name, serviceInstance);
		});

		controllers.forEach((e) => {
			const controllerClass = require(e.path).default;
			const controllerInstance = Container.get(controllerClass);
			Container.set(e.name, controllerInstance);
		});
	} catch (e) {
		Logger.error('Error on dependency injector loader: ' + e);
		throw e;
	}
};
