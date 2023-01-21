import config from '../../config';
import IEmployeeController from '../controllers/IControllers/IEmployeeController';

import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const employeeRoute = Router();

export default (app: Router) => {
	app.use('/employee', employeeRoute);

	const controller = Container.get(config.controllers.employee.name) as IEmployeeController;

	employeeRoute.post(
		'',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				role: Joi.string().required(),
				salary: Joi.number().required(),
			}),
		}),
		(req, res, next) => controller.createEmployee(req, res, next)
	);

	employeeRoute.get('', (req, res, next) => controller.findEmployee(req, res, next));

	employeeRoute.get('/all', (req, res, next) => controller.findAllEmployees(req, res, next));

	employeeRoute.put(
		'',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				role: Joi.string().required(),
				salary: Joi.number().required(),
			}),
		}),
		(req, res, next) => controller.updateEmployee(req, res, next)
	);

	employeeRoute.delete('', (req, res, next) => controller.deleteEmployee(req, res, next));
};
