import config from '../../config';
import IRoleController from './IControllers/IRoleController';
import IRoleService from '../services/IServices/IRoleService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleController implements IRoleController {
	constructor(@Inject(config.services.role) private serviceInstance: IRoleService) {}

	public async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.createRole(req.body);
			if (!result.isSuccess) {
				res.status(400);
				res.send(result.error);
			} else {
				res.status(201);
				res.json(result.value);
			}
		} catch (e) {
			next(e);
		}
	}

	public async findAllRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.findAllRoles();
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.json(result.value);
			}
		} catch (e) {
			next(e);
		}
	}

	public async updateRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const roleName = req.query.roleName as string;

			const result = await this.serviceInstance.updateRole(roleName, req.body);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.json(result.value);
			}
		} catch (e) {
			next(e);
		}
	}

	public async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const roleName = req.query.roleName as string;

			const result = await this.serviceInstance.deleteRole(roleName);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.json(result.value);
			}
		} catch (e) {
			next(e);
		}
	}
}
