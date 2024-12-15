import { PERMISSIONS, TYPES } from '../../config';
import CoreController from './coreController';
import IUserService from '../services/IServices/IUserService';
import Auth from '../core/middlewares/authentication';
import Zod from '../core/middlewares/validation';
import { userSignUpBody, userLoginBody } from '../dtos/userDTO';

import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export default class UserController extends CoreController {
	constructor(@inject(TYPES.IUserService) private userService: IUserService) {
		super();
	}

	public registerRoutes(): Router {
		const router = Router();

		router.post('/signup', Zod(userSignUpBody), this.signup.bind(this));
		router.post('/login', Zod(userLoginBody), this.login.bind(this));
		router.get('/', this.findAll.bind(this));
		router.get('/search', this.find.bind(this));
		router.get('/:id', this.findOne.bind(this));
		router.put('/profile', Auth(), Zod(userSignUpBody), this.updateProfile.bind(this));
		router.put('/role', Auth([PERMISSIONS.manageUsers]), this.updateRole.bind(this));
		router.delete('/', Auth(), this.deleteCurrent.bind(this));
		router.delete('/:id', Auth([PERMISSIONS.manageUsers]), this.delete.bind(this));

		return router;
	}

	private async signup(req: Request, res: Response): Promise<void> {
		const data = req.body;
		await this.handleServiceCall(() => this.userService.signUp(data), res);
	}

	private async login(req: Request, res: Response): Promise<void> {
		const data = req.body;
		await this.handleServiceCall(() => this.userService.login(data), res);
	}

	private async findAll(req: Request, res: Response): Promise<void> {
		const pageNumber = Number(req.query.pageNumber as string) || 1;
		const pageSize = Number(req.query.pageSize as string) || 16;
		await this.handleServiceCall(() => this.userService.findAllUsers(pageNumber, pageSize), res);
	}

	private async find(req: Request, res: Response): Promise<void> {
		const pageNumber = Number(req.query.pageNumber as string) || 1;
		const pageSize = Number(req.query.pageSize as string) || 16;
		const firstName = (req.query.firstName as string) || '';
		const lastName = (req.query.lastName as string) || '';
		const email = (req.query.email as string) || '';
		await this.handleServiceCall(
			() => this.userService.findUsers(pageNumber, pageSize, firstName, lastName, email),
			res
		);
	}

	private async findOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.handleServiceCall(() => this.userService.findOneUser(id), res);
	}

	private async updateProfile(req: Request, res: Response): Promise<void> {
		const id = req.token.id;
		const data = req.body;
		await this.handleServiceCall(() => this.userService.updateProfile(id, data), res);
	}

	private async updateRole(req: Request, res: Response): Promise<void> {
		const userId = (req.query.userId as string) || '';
		const roleId = (req.query.roleId as string) || '';
		await this.handleServiceCall(() => this.userService.updateUserRole(userId, roleId), res);
	}

	private async deleteCurrent(req: Request, res: Response): Promise<void> {
		const id = req.token.id;
		await this.handleServiceCall(() => this.userService.deleteCurrentUser(id), res);
	}

	private async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.handleServiceCall(() => this.userService.deleteUser(id), res);
	}
}
