import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
	signUp(req: Request, res: Response, next: NextFunction): any;

	login(req: Request, res: Response, next: NextFunction): any;

	updateProfile(req: Request, res: Response, next: NextFunction): any;

	updateUserRole(req: Request, res: Response, next: NextFunction): any;

	deleteAccount(req: Request, res: Response, next: NextFunction): any;
}
