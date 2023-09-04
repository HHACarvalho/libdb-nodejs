import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
	signUp(req: Request, res: Response, next: NextFunction): Promise<void>;

	login(req: Request, res: Response, next: NextFunction): Promise<void>;

	findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;

	findUser(req: Request, res: Response, next: NextFunction): Promise<void>;

	updateProfile(req: Request, res: Response, next: NextFunction): Promise<void>;

	updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void>;

	deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void>;
}
