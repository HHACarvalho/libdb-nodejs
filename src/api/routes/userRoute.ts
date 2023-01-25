import config from '../../../config';
import IUserController from '../../controllers/IControllers/IUserController';

import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const controller = Container.get(config.controllers.user.name) as IUserController;

	userRoute.post(
		'',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				role: Joi.string().required(),
			}),
		}),
		(req, res, next) => controller.createUser(req, res, next)
	);

	userRoute.get('', (req, res, next) => controller.getUser(req, res, next));

	userRoute.get('/all', (req, res, next) => controller.getAllUsers(req, res, next));

	userRoute.put(
		'',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				role: Joi.string().required(),
			}),
		}),
		(req, res, next) => controller.updateUser(req, res, next)
	);

	userRoute.patch('', (req, res, next) => controller.toggleUser(req, res, next));

	userRoute.delete('', (req, res, next) => controller.deleteUser(req, res, next));
};
