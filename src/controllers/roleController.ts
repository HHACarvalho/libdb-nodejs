import config from '../../config';
import { Result } from '../core/result';
import { Utils } from '../core/utils';
import IRoleController from './IControllers/IRoleController';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleService from '../services/IServices/IRoleService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import { Logger } from 'winston';

@Service()
export default class RoleController implements IRoleController {
	constructor(
		@Inject(config.services.role) private serviceInstance: IRoleService,
		@Inject('logger') private logger: Logger
	) {}

	public async createRole(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.createRole(req.body)) as Result<IRoleDTO>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.createRole.name));

				res.status(400);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.createRole.name));

			res.status(201);
			return res.json(result.value);
		} catch (e) {
			return next(e);
		}
	}

	public async checkPermissions(req: Request, res: Response, next: NextFunction) {
		try {
			const cookie = req.cookies.token as string;

			const result = (await this.serviceInstance.checkPermissions(cookie, req.body.permissions)) as Result<any>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.checkPermissions.name));

				res.status(403);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.checkPermissions.name));

			res.status(200);
			return res.send();
		} catch (e) {
			return next(e);
		}
	}

	public async findAllRoles(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.findAllRoles()) as Result<IRoleDTO[]>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.findAllRoles.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.findAllRoles.name));

			res.status(200);
			return res.json(result.value);
		} catch (e) {
			return next(e);
		}
	}

	public async updateRole(req: Request, res: Response, next: NextFunction) {
		try {
			const nameParameter = req.query.name as string;

			const result = (await this.serviceInstance.updateRole(nameParameter, req.body)) as Result<IRoleDTO>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.updateRole.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.updateRole.name));

			res.status(200);
			return res.json(result.value);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteRole(req: Request, res: Response, next: NextFunction) {
		try {
			const nameParameter = req.query.name as string;

			const result = (await this.serviceInstance.deleteRole(nameParameter)) as Result<IRoleDTO>;
			if (!result.isSuccess) {
				this.logger.warn(Utils.logMessage(false, this.deleteRole.name));

				res.status(404);
				return res.send(result.error);
			}

			this.logger.info(Utils.logMessage(true, this.deleteRole.name));

			res.status(200);
			return res.json(result.value);
		} catch (e) {
			return next(e);
		}
	}
}
