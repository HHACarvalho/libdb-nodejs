import { NextFunction, Request, Response } from 'express';

export default interface IRoleController {
	createRole(req: Request, res: Response, next: NextFunction): any;

	checkPermissions(req: Request, res: Response, next: NextFunction): any;

	findAllRoles(req: Request, res: Response, next: NextFunction): any;

	updateRole(req: Request, res: Response, next: NextFunction): any;

	deleteRole(req: Request, res: Response, next: NextFunction): any;
}
