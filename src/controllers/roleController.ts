import config from '../../config';
import { Result } from '../core/Result';
import IRoleController from './IControllers/IRoleController';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleService from '../services/IServices/IRoleService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleController implements IRoleController {
	constructor(
		@Inject(config.services.role) private serviceInstance: IRoleService,
		@Inject('logger') private logger
	) {}

	public async createRole(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.createRole(req.body)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received createRole() request -> fail');
				return res.status(400);
			}

			this.logger.info('Received createRole() request -> success');
			return res.status(201);
		} catch (e) {
			return next(e);
		}
	}

	public async findAllRoles(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.findAllRoles()) as Result<IRoleDTO[]>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received findAllRoles() request -> fail');
				return res.status(404);
			}

			res.json(objOrError.value);

			this.logger.info('Received findAllRoles() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async updateRole(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateRole(req.body)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received updateRole() request -> fail');
				return res.status(404);
			}

			this.logger.info('Received updateRole() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteRole(req: Request, res: Response, next: NextFunction) {
		try {
			const nameParameter = req.query.name as string;

			const objOrError = (await this.serviceInstance.deleteRole(nameParameter)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received deleteRole() request -> fail');
				return res.status(404);
			}

			this.logger.info('Received deleteRole() request -> success');
			return res.status(204);
		} catch (e) {
			return next(e);
		}
	}
}
