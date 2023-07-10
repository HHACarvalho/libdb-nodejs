import config from '../../../config';
import IUserController from '../../controllers/IControllers/IUserController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const controller = Container.get(config.controllers.user) as IUserController;

	const fullBodySchema = celebrate({
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

	userRoute.post('', fullBodySchema, (req, res, next) => controller.signUp(req, res, next));

	userRoute.get('', loginSchema, (req, res, next) => controller.login(req, res, next));

	userRoute.put('', fullBodySchema, (req, res, next) => controller.updateUser(req, res, next));

	userRoute.delete('', (req, res, next) => controller.deleteUser(req, res, next));
};
