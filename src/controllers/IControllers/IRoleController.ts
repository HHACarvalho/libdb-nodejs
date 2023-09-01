import { NextFunction, Request, Response } from 'express';

export default interface IRoleController {
	createRole(req: Request, res: Response, next: NextFunction): Promise<void>;

	findAllRoles(req: Request, res: Response, next: NextFunction): Promise<void>;

	updateRole(req: Request, res: Response, next: NextFunction): Promise<void>;

	deleteRole(req: Request, res: Response, next: NextFunction): Promise<void>;
}
