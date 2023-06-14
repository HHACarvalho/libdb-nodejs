import config from '../../../config';
import IRoleController from '../../controllers/IControllers/IRoleController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const roleRoute = Router();

export default (app: Router) => {
	app.use('/role', roleRoute);

	const controller = Container.get(config.controllers.role) as IRoleController;

	const schema = celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().min(2).max(32).required(),
			description: Joi.string().min(2).max(96).required(),
		}),
	});

	const schemaNameQuery = celebrate({
		[Segments.QUERY]: Joi.object().keys({
			name: Joi.string().min(2).max(32).required(),
		}),
	});

	roleRoute.post('', schema, (req, res, next) => controller.createRole(req, res, next));

	roleRoute.get('/all', (req, res, next) => controller.findAllRoles(req, res, next));

	roleRoute.put('', schema, (req, res, next) => controller.updateRole(req, res, next));

	roleRoute.delete('', schemaNameQuery, (req, res, next) => controller.deleteRole(req, res, next));
};
