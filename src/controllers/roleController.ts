import config from '../../config';
import { Result } from '../core/Result';
import IRoleController from './IControllers/IRoleController';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleService from '../services/IServices/IRoleService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleController implements IRoleController {
	constructor(@Inject(config.services.role) private serviceInstance: IRoleService) {}

	public async createRole(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.createRole(req.body)) as Result<IRoleDTO>;
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

	public async findAllRoles(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.findAllRoles()) as Result<IRoleDTO[]>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async updateRole(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateRole(req.body)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteRole(req: Request, res: Response, next: NextFunction) {
		try {
			const nameParameter = req.query.name as string;

			const objOrError = (await this.serviceInstance.deleteRole(nameParameter)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}
}
