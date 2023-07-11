import config from '../../../config';
import { validateJwt, validatePermissions } from '../authMiddleware';
import IUserController from '../../controllers/IControllers/IUserController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const controller = Container.get(config.controllers.user) as IUserController;

	const signUpSchema = celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).max(32).required(),
			firstName: Joi.string().alphanum().min(2).max(32).required(),
			lastName: Joi.string().alphanum().min(2).max(32).required(),
		}),
	});

	const loginSchema = celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).max(32).required(),
		}),
	});

	const updateUserSchema = celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().email().allow('', null),
			password: Joi.string().min(8).max(32).allow('', null),
			firstName: Joi.string().alphanum().min(2).max(32).allow('', null),
			lastName: Joi.string().alphanum().min(2).max(32).allow('', null),
		}),
	});

	userRoute.post('', signUpSchema, (req, res, next) => controller.signUp(req, res, next));

	userRoute.get('', loginSchema, (req, res, next) => controller.login(req, res, next));

	userRoute.put('', updateUserSchema, validateJwt, validatePermissions(['Default']), (req, res, next) =>
		controller.updateUser(req, res, next)
	);

	userRoute.delete('', validateJwt, validatePermissions(['Default']), (req, res, next) =>
		controller.deleteUser(req, res, next)
	);
};
