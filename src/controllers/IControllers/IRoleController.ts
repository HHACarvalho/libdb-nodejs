import { NextFunction, Request, Response } from 'express';

export default interface IRoleController {
	createRole(req: Request, res: Response, next: NextFunction);

	getRole(req: Request, res: Response, next: NextFunction);

	getAllRoles(req: Request, res: Response, next: NextFunction);

	updateRole(req: Request, res: Response, next: NextFunction);

	deleteRole(req: Request, res: Response, next: NextFunction);
}
