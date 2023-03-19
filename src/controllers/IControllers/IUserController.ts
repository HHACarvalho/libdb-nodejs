import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
	signUp(req: Request, res: Response, next: NextFunction);

	login(req: Request, res: Response, next: NextFunction);

	updateUser(req: Request, res: Response, next: NextFunction);

	deleteUser(req: Request, res: Response, next: NextFunction);
}
