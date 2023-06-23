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

			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			this.logger.info('Received signUp() request -> success');
			return res.status(201);
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

			res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			this.logger.info('Received login() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.updateUser(req.body)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn('Received updateUser() request -> fail');
				return res.status(404);
			}

			this.logger.info('Received updateUser() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;

			const result = (await this.serviceInstance.deleteUser(emailParameter)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn('Received deleteUser() request -> fail');
				return res.status(404);
			}

			this.logger.info('Received deleteUser() request -> success');
			return res.status(204);
		} catch (e) {
			return next(e);
		}
	}
}
