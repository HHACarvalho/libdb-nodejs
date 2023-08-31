import { NextFunction, Request, Response } from 'express';

export default interface IRoleController {
	createRole(req: Request, res: Response, next: NextFunction);

	checkPermissions(req: Request, res: Response, next: NextFunction);

	findAllRoles(req: Request, res: Response, next: NextFunction);

	updateRole(req: Request, res: Response, next: NextFunction);

	deleteRole(req: Request, res: Response, next: NextFunction);
}
