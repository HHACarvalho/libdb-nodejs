import config from '../../../config';
import Logger from './loggerLoader';

import { Container } from 'typedi';

export default () => {
	try {
		Container.set('logger', Logger);

		Object.values(config.schemas).forEach((e) => {
			const schema = require('../../schemas/' + e).default;
			Container.set(e, schema);
		});

		Object.values(config.repos).forEach((e) => {
			const repoClass = require('../../repos/' + e).default;
			const repoInstance = Container.get(repoClass);
			Container.set(e, repoInstance);
		});

		Object.values(config.services).forEach((e) => {
			const serviceClass = require('../../services/' + e).default;
			const serviceInstance = Container.get(serviceClass);
			Container.set(e, serviceInstance);
		});

		Object.values(config.controllers).forEach((e) => {
			const controllerClass = require('../../controllers/' + e).default;
			const controllerInstance = Container.get(controllerClass);
			Container.set(e, controllerInstance);
		});
	} catch (e) {
		Logger.error('Error on dependency injector loader: ' + e);
		throw e;
	}
};
