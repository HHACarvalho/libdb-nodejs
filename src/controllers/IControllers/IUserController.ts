import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
	signUp(req: Request, res: Response, next: NextFunction);

	login(req: Request, res: Response, next: NextFunction);

	updateProfile(req: Request, res: Response, next: NextFunction);

	updateUserRole(req: Request, res: Response, next: NextFunction);

	deleteAccount(req: Request, res: Response, next: NextFunction);
}
