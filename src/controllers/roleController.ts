import config from '../../config';
import { Utils } from '../core/utils';
import IRoleController from './IControllers/IRoleController';
import IRoleService from '../services/IServices/IRoleService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleController implements IRoleController {
	constructor(
		@Inject(config.services.role) private serviceInstance: IRoleService,
		@Inject('logger') private logger
	) {}

	public async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.createRole(req.body);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.createRole.name));

				res.status(400);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.createRole.name));

			res.status(201);
			res.json(result.value);
		} catch (e) {
			next(e);
		}
	}

	public async findAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.findAllRoles();
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.findAllRoles.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.findAllRoles.name));

			res.status(200);
			res.json(result.value);
		} catch (e) {
			next(e);
		}
	}

	public async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const roleName = req.query.name as string;

			const result = await this.serviceInstance.updateRole(roleName, req.body);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.updateRole.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.updateRole.name));

			res.status(200);
			res.json(result.value);
		} catch (e) {
			next(e);
		}
	}

	public async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const roleName = req.query.name as string;

			const result = await this.serviceInstance.deleteRole(roleName);
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.deleteRole.name));

				res.status(404);
				res.send(result.error);
				return;
			}

			this.logger.info(Utils.logMessage(true, this.deleteRole.name));

			res.status(200);
			res.json(result.value);
		} catch (e) {
			next(e);
		}
	}
}
