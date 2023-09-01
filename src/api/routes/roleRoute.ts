import config from '../../../config';
import { userValidation } from '../authMiddleware';
import { Permissions } from '../../core/permissions';
import IRoleController from '../../controllers/IControllers/IRoleController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const roleRoute = Router();
roleRoute.use(userValidation([Permissions.manageRoles]));

export default (app: Router) => {
	app.use('/role', roleRoute);

	const controller = Container.get(config.controllers.role) as IRoleController;

	const bodySchema = celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().min(2).max(32).required(),
			permissions: Joi.object({
				manageMovies: Joi.boolean().required(),
				manageRoles: Joi.boolean().required(),
				manageUsers: Joi.boolean().required(),
			}).required(),
		}),
	});

	roleRoute.post('', bodySchema, (req, res, next) => {
		controller.createRole(req, res, next);
	});

	roleRoute.get('/all', (req, res, next) => {
		controller.findAllRoles(req, res, next);
	});

	roleRoute.put('', bodySchema, (req, res, next) => {
		controller.updateRole(req, res, next);
	});

	roleRoute.delete('', (req, res, next) => {
		controller.deleteRole(req, res, next);
	});
};
