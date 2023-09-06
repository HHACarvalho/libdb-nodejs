import config from '../../config';
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class UserController implements IUserController {
	constructor(@Inject(config.services.user) private serviceInstance: IUserService) {}

	public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.signUp(req.body);
			if (!result.isSuccess) {
				res.status(400);
				res.send(result.error);
			} else {
				res.status(201);
				res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
				res.send('Successful signup');
			}
		} catch (e) {
			next(e);
		}
	}

	public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.login(req.body);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
				res.send('Successful login');
			}
		} catch (e) {
			next(e);
		}
	}

	public async findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.serviceInstance.findAllUsers();
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.json(result.value);
			}
		} catch (e) {
			next(e);
		}
	}

	public async findUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = req.query.userId as string;

			const result = await this.serviceInstance.findUser(userId);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.json(result.value);
			}
		} catch (e) {
			next(e);
		}
	}

	public async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userEmail = req['token'].email as string;

			const result = await this.serviceInstance.updateProfile(userEmail, req.body);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.cookie('token', result.value, { httpOnly: true, maxAge: config.jwtDuration * 1000 });
				res.send('Successfully updated user profile');
			}
		} catch (e) {
			next(e);
		}
	}

	public async updateUserRole(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = req.query.userId as string;
			const roleName = req.query.roleName as string;

			const result = await this.serviceInstance.updateUserRole(userId, roleName);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.send('Successfully updated user role');
			}
		} catch (e) {
			next(e);
		}
	}

	public async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userEmail = req['token'].email as string;

			const result = await this.serviceInstance.deleteUser(userEmail);
			if (!result.isSuccess) {
				res.status(404);
				res.send(result.error);
			} else {
				res.status(200);
				res.clearCookie('token');
				res.send('Successfully deleted account');
			}
		} catch (e) {
			next(e);
		}
	}
}
