import config from '../../config';
import { Result } from '../core/Result';
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

	public async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.signUp(req.body)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn('Received signUp() request -> fail');
				return res.status(400);
			}

			res.status(201);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			this.logger.info('Received signUp() request -> success');
			return res.send('Successful signup');
		} catch (e) {
			return next(e);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.login(req.body)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn('Received login() request -> fail');
				return res.status(404);
			}

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			this.logger.info('Received login() request -> success');
			return res.send('Successful login');
		} catch (e) {
			return next(e);
		}
	}

	public async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.updateProfile(req['token'].email, req.body)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn('Received updateProfile() request -> fail');
				return res.status(404);
			}

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			this.logger.info('Received updateProfile() request -> success');
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
				res.json(result.error);

				this.logger.warn('Received updateUserRole() request -> fail');
				return res.status(404);
			}

			res.status(200);
			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			this.logger.info('Received updateUserRole() request -> success');
			return res.send('Successfully updated user role');
		} catch (e) {
			return next(e);
		}
	}

	public async deleteAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;

			const result = (await this.serviceInstance.deleteUser(emailParameter)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn('Received deleteAccount() request -> fail');
				return res.status(404);
			}

			res.status(204);

			this.logger.info('Received deleteAccount() request -> success');
			return res.send('Successfully deleted account');
		} catch (e) {
			return next(e);
		}
	}
}
