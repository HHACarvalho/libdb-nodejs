import config from '../../../config';
import { Permissions } from '../../core/permissions';
import { userValidation } from '../authMiddleware';
import IRoleController from '../../controllers/IControllers/IRoleController';

import { Router } from 'express';
import { Container } from 'typedi';
import { z } from 'zod';

const roleRoute = Router();
roleRoute.use(userValidation([Permissions.manageRoles]));

export default (app: Router) => {
	app.use('/role', roleRoute);

	const controller = Container.get(config.controllers.role) as IRoleController;

	const roleCreateBody = z.object({
		name: z.string().min(2).max(32),
		permissions: z.object({
			manageMovies: z.boolean(),
			manageRoles: z.boolean(),
			manageUsers: z.boolean(),
		}),
	});

	roleRoute.post('', (req, res, next) => {
		roleCreateBody.parse(req.body);
		controller.createRole(req, res, next);
	});

	roleRoute.get('/all', (req, res, next) => {
		controller.findAllRoles(req, res, next);
	});

	roleRoute.put('', (req, res, next) => {
		roleCreateBody.parse(req.body);
		controller.updateRole(req, res, next);
	});

	roleRoute.delete('', (req, res, next) => {
		controller.deleteRole(req, res, next);
	});
};
