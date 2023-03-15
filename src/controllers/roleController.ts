import config from '../../config';
import IRoleController from './IControllers/IRoleController';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleService from '../services/IServices/IRoleService';
import { Result } from '../core/infrastructure/Result';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleController implements IRoleController {
	constructor(@Inject(config.services.role.name) private serviceInstance: IRoleService) {}

	public async createRole(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.createRole(req.body)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async getRole(req: Request, res: Response, next: NextFunction) {
		try {
			const nameParameter = req.query.name as string;
			if (nameParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.getRole(nameParameter)) as Result<IRoleDTO>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async getAllRoles(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.getAllRoles()) as Result<IRoleDTO[]>;
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
			if (nameParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

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
