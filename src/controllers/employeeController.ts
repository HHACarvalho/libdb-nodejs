import config from '../../config';
import IEmployeeController from './IControllers/IEmployeeController';
import IEmployeeService from '../services/IServices/IEmployeeService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import IEmployeeDTO from '../dtos/IEmployeeDTO';
import { Result } from '../core/infrastructure/Result';

@Service()
export default class EmployeeController implements IEmployeeController {
	constructor(@Inject(config.services.employee.name) private serviceInstance: IEmployeeService) {}

	public async createEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.createEmployee(req.body)) as Result<IEmployeeDTO>;

			if (!objOrError.isSuccess) return res.status(400).json(objOrError.error);

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async findAllEmployees(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.getAllEmployees()) as Result<IEmployeeDTO[]>;

			if (!objOrError.isSuccess) return res.status(404).json(objOrError.error);

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async findEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;

			if (emailParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.getEmployee(emailParameter)) as Result<IEmployeeDTO>;

			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async updateEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateEmployee(req.body)) as Result<IEmployeeDTO>;

			if (!objOrError.isSuccess) return res.status(400).json(objOrError.error);

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteEmployee(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;

			if (emailParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.deleteEmployee(emailParameter)) as Result<IEmployeeDTO>;

			if (!objOrError.isSuccess) return res.status(400).json(objOrError.error);

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}
}
