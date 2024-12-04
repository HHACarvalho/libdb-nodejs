import config from '../../config';
import CoreController from './coreController';
import IUserService from '../services/IServices/IUserService';
import { userSignUpBody, userLoginBody } from '../dtos/userDTO';

import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export default class UserController extends CoreController {
	constructor(@inject(config.TYPES.IUserService) private userService: IUserService) {
		super();
	}

	public registerRoutes(): Router {
		const router = Router();

		router.post('/signup', this.signup.bind(this));
		router.post('/login', this.login.bind(this));
		router.get('/', this.findAllUsers.bind(this));
		router.get('/search', this.findUsers.bind(this));
		router.get('/:email', this.findOneUser.bind(this));
		router.put('/profile/:email', this.updateUserProfile.bind(this));
		router.put('/role', this.updateUserRole.bind(this));
		router.delete('/:email', this.deleteUser.bind(this));

		return router;
	}

	private async signup(req: Request, res: Response): Promise<void> {
		const data = userSignUpBody.parse(req.body);
		await this.handleServiceCall(() => this.userService.signUp(data), res);
	}

	private async login(req: Request, res: Response): Promise<void> {
		const data = userLoginBody.parse(req.body);
		await this.handleServiceCall(() => this.userService.login(data), res);
	}

	private async findAllUsers(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.userService.findAllUsers(), res);
	}

	private async findUsers(req: Request, res: Response): Promise<void> {
		const email = (req.query.email as string) || '';
		await this.handleServiceCall(() => this.userService.findUsers(email), res);
	}

	private async findOneUser(req: Request, res: Response): Promise<void> {
		const { email } = req.params;
		await this.handleServiceCall(() => this.userService.findOneUser(email), res);
	}

	private async updateUserProfile(req: Request, res: Response): Promise<void> {
		const { email } = req.params;
		const data = userSignUpBody.parse(req.body);
		await this.handleServiceCall(() => this.userService.updateProfile(email, data), res);
	}

	private async updateUserRole(req: Request, res: Response): Promise<void> {
		const email = (req.query.email as string) || '';
		const role = (req.query.role as string) || '';
		await this.handleServiceCall(() => this.userService.updateUserRole(email, role), res);
	}

	private async deleteUser(req: Request, res: Response): Promise<void> {
		const { email } = req.params;
		await this.handleServiceCall(() => this.userService.deleteUser(email), res);
	}
}
