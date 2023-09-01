import config from '../../config';
import { Utils } from '../core/utils';
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class UserController implements IUserController {
	constructor(
		@Inject(config.services.user) private serviceInstance: IUserService,
		@Inject('logger') private logger
	) {}

	public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.signUp(req.body);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.signUp.name));

				res.status(400);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.signUp.name));

			res.status(201);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
			res.send('Successful signup');
		} catch (e) {
			next(e);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.login(req.body);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.login.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.login.name));

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
			res.send('Successful login');
		} catch (e) {
			next(e);
		}
	}

	public async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userEmail = req['token'].email as string;

			const result = await this.serviceInstance.updateProfile(userEmail, req.body);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.updateProfile.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.updateProfile.name));

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
			res.send('Successfully updated user profile');
		} catch (e) {
			next(e);
		}
	}

	public async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userEmail = req.query.email as string;
			const roleName = req.query.role as string;

			const result = await this.serviceInstance.updateUserRole(userEmail, roleName);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.updateUserRole.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.updateUserRole.name));

			res.status(200);
			res.send('Successfully updated user role');
		} catch (e) {
			next(e);
		}
	}

	public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userEmail = req['token'].email as string;

			const result = await this.serviceInstance.deleteUser(userEmail);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.deleteAccount.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.deleteAccount.name));

			res.status(200);
			res.clearCookie('token');
			res.send('Successfully deleted account');
		} catch (e) {
			next(e);
		}
	}
}
