import config from '../../../config';
import { userValidation } from '../authMiddleware';
import IUserController from '../../controllers/IControllers/IUserController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const controller = Container.get(config.controllers.user) as IUserController;

	const bodySchema = celebrate({
		[Segments.BODY]: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).max(32).required(),
			firstName: Joi.string().alphanum().min(2).max(32).required(),
			lastName: Joi.string().alphanum().min(2).max(32).required(),
		}),
	});

	const loginSchema = celebrate({
		[Segments.BODY]: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).max(32).required(),
		}),
	});

	userRoute.post('', bodySchema, (req, res, next) => {
		controller.signUp(req, res, next);
	});

	userRoute.get('', loginSchema, (req, res, next) => {
		controller.login(req, res, next);
	});

	userRoute.put('', bodySchema, userValidation, (req, res, next) => {
		controller.updateUser(req, res, next);
	});

	userRoute.delete('', userValidation, (req, res, next) => {
		controller.deleteUser(req, res, next);
	});
};
