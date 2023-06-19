import config from '../../config';
import { Result } from '../core/Result';
import IUserController from './IControllers/IUserController';
import IUserDTO from '../dtos/IUserDTO';
import IUserService from '../services/IServices/IUserService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class UserController implements IUserController {
	constructor(@Inject(config.services.user) private serviceInstance: IUserService) {}

	public async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.signUp(req.body)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				res.status(400);
				res.json(objOrError.error);
				return res;
			}

			res.cookie('token', objOrError.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			res.status(201);
			res.json(objOrError.value);
			return res;
		} catch (e) {
			return next(e);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.login(req.body)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				res.status(404);
				res.json(objOrError.error);
				return res;
			}

			res.cookie('token', objOrError.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });

			res.status(200);
			res.json(objOrError.value);
			return res;
		} catch (e) {
			return next(e);
		}
	}

	public async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateUser(req.body)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				res.status(400);
				res.json(objOrError.error);
				return res;
			}

			res.status(201);
			res.json(objOrError.value);
			return res;
		} catch (e) {
			return next(e);
		}
	}

	public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;

			const objOrError = (await this.serviceInstance.deleteUser(emailParameter)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				res.status(400);
				res.json(objOrError.error);
				return res;
			}

			res.status(200);
			res.json(objOrError.value);
			return res;
		} catch (e) {
			return next(e);
		}
	}
}
