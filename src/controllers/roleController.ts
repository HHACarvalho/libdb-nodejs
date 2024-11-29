import { TYPES } from '../../config';
import CoreController from './coreController';
import IRoleService from '../services/IServices/IRoleService';

import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { z } from 'zod';

const roleCreateBody = z.object({
	name: z.string().min(2).max(32),
	permissions: z.object({
		manageMovies: z.boolean(),
		manageRoles: z.boolean(),
		manageUsers: z.boolean()
	})
});

// const roleCreateBody = z.object({
// 	name: z.string().min(2).max(32),
// 	permissions: z.array(z.string())
// });

@injectable()
export default class RoleController extends CoreController {
	private roleService: IRoleService;

	constructor(@inject(TYPES.IRoleService) roleService: IRoleService) {
		super();
		this.roleService = roleService;
	}

	public registerRoutes(): Router {
		const router = Router();

		router.post('/', this.createRole.bind(this));
		router.get('/', this.findAllRoles.bind(this));
		router.get('/search', this.findRoles.bind(this));
		router.get('/:roleName', this.findOneRole.bind(this));
		router.put('/:roleName', this.updateRole.bind(this));
		router.delete('/:roleName', this.deleteRole.bind(this));

		return router;
	}

	private async createRole(req: Request, res: Response): Promise<void> {
		const data = roleCreateBody.parse(req.body);
		await this.handleServiceCall(() => this.roleService.createRole(data), res);
	}

	private async findAllRoles(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.findAllRoles(), res);
	}

	private async findRoles(req: Request, res: Response): Promise<void> {
		const roleName = (req.query.roleName as string) || '';
		await this.handleServiceCall(() => this.roleService.findRoles(roleName), res);
	}

	private async findOneRole(req: Request, res: Response): Promise<void> {
		const { roleName } = req.params;
		await this.handleServiceCall(() => this.roleService.findOneRole(roleName), res);
	}

	private async updateRole(req: Request, res: Response): Promise<void> {
		const { roleName } = req.params;
		const data = roleCreateBody.parse(req.body);
		await this.handleServiceCall(() => this.roleService.updateRole(roleName, data), res);
	}

	private async deleteRole(req: Request, res: Response): Promise<void> {
		const { roleName } = req.params;
		await this.handleServiceCall(() => this.roleService.deleteRole(roleName), res);
	}
}
