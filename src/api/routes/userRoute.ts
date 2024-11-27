import config from '../../../config';
import { Permissions } from '../../core/permissions';
import { userValidation } from '../authMiddleware';
import IUserController from '../../controllers/IControllers/IUserController';

import { Router } from 'express';
import { Container } from 'typedi';
import { z } from 'zod';

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const controller = Container.get(config.controllers.user) as IUserController;

	const userSignUpBody = z.object({
		email: z.string().email(),
		password: z.string().min(2).max(32),
		firstName: z
			.string()
			.regex(/^[a-zA-Z0-9]+$/)
			.min(2)
			.max(32),
		lastName: z
			.string()
			.regex(/^[a-zA-Z0-9]+$/)
			.min(2)
			.max(32),
	});

	const userLoginBody = z.object({
		email: z.string().email(),
		password: z.string().min(2).max(32),
	});

	userRoute.post('/signup', (req, res, next) => {
		userSignUpBody.parse(req.body);
		controller.signUp(req, res, next);
	});

	userRoute.post('/login', (req, res, next) => {
		userLoginBody.parse(req.body);
		controller.login(req, res, next);
	});

	userRoute.get('/all', userValidation([Permissions.manageUsers]), (req, res, next) => {
		controller.findAllUsers(req, res, next);
	});

	userRoute.get('', (req, res, next) => {
		controller.findUser(req, res, next);
	});

	userRoute.put('/profile', userValidation(), (req, res, next) => {
		userSignUpBody.parse(req.body);
		controller.updateProfile(req, res, next);
	});

	userRoute.put('/roles', userValidation([Permissions.manageUsers]), (req, res, next) => {
		controller.updateUserRole(req, res, next);
	});

	userRoute.delete('', userValidation(), (req, res, next) => {
		controller.deleteAccount(req, res, next);
	});
};
