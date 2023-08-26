import config from '../../config';
import { Result } from '../core/result';
import { Utils } from '../core/utils';
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';

@Service()
export default class UserController implements IUserController {
	constructor(
		@Inject(config.services.user) private serviceInstance: IUserService,
		@Inject('logger') private logger: Logger
	) {}

	public async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.signUp(req.body)) as Result<any>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.signUp.name));

				res.status(400);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.signUp.name));

			res.status(201);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
			return res.send('Successful signup');
		} catch (e) {
			return next(e);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.login(req.body)) as Result<any>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.login.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.login.name));

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
			return res.send('Successful login');
		} catch (e) {
			return next(e);
		}
	}

	public async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.updateProfile(req['token'].email, req.body)) as Result<any>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.updateProfile.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.updateProfile.name));

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
			return res.send('Successfully updated user profile');
		} catch (e) {
			return next(e);
		}
	}

	public async updateUserRole(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;
			const roleParameter = req.query.role as string;

			const result = (await this.serviceInstance.updateUserRole(emailParameter, roleParameter)) as Result<any>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.updateUserRole.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.updateUserRole.name));

			res.status(200);
			return res.send('Successfully updated user role');
		} catch (e) {
			return next(e);
		}
	}

	public async deleteAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.deleteUser(req['token'].email)) as Result<any>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.deleteAccount.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.deleteAccount.name));

			res.status(200);
			res.clearCookie('token');
			return res.send('Successfully deleted account');
		} catch (e) {
			return next(e);
		}
	}
}
