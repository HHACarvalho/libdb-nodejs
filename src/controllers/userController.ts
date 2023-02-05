import config from '../../config';
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import IUserDTO from '../dtos/IUserDTO';
import { Result } from '../core/infrastructure/Result';

@Service()
export default class UserController implements IUserController {
	constructor(@Inject(config.services.user.name) private serviceInstance: IUserService) {}

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.createUser(req.body)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.getAllUsers()) as Result<IUserDTO[]>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async getUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;
			if (emailParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.getUser(emailParameter)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateUser(req.body)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async toggleUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;
			if (emailParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.toggleUser(emailParameter)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;
			if (emailParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.deleteUser(emailParameter)) as Result<IUserDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}
}
