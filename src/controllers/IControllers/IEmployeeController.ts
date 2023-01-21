import { NextFunction, Request, Response } from 'express';

export default interface IEmployeeController {
	createEmployee(req: Request, res: Response, next: NextFunction);

	findAllEmployees(req: Request, res: Response, next: NextFunction);

	findEmployee(req: Request, res: Response, next: NextFunction);

	updateEmployee(req: Request, res: Response, next: NextFunction);

	deleteEmployee(req: Request, res: Response, next: NextFunction);
}
