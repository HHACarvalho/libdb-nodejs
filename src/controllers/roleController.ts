import { PERMISSIONS, TYPES } from '../../config';
import CoreController from './coreController';
import IRoleService from '../services/IServices/IRoleService';
import Auth from '../core/middlewares/authentication';
import Zod from '../core/middlewares/validation';
import { roleCreateBody } from '../dtos/roleDTO';

import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export default class RoleController extends CoreController {
	private roleService: IRoleService;

	constructor(@inject(TYPES.IRoleService) roleService: IRoleService) {
		super();
		this.roleService = roleService;
	}

	public registerRoutes(): Router {
		const router = Router();

		router.post('/', Auth([PERMISSIONS.manageRoles]), Zod(roleCreateBody), this.create.bind(this));
		router.get('/', this.findAll.bind(this));
		router.get('/:id', this.findOne.bind(this));
		router.put('/:id', Auth([PERMISSIONS.manageRoles]), Zod(roleCreateBody), this.update.bind(this));
		router.delete('/:id', Auth([PERMISSIONS.manageRoles]), this.delete.bind(this));

		return router;
	}

	private async create(req: Request, res: Response): Promise<void> {
		const data = req.body;
		await this.handleServiceCall(() => this.roleService.createRole(data), res);
	}

	private async findAll(req: Request, res: Response): Promise<void> {
		await this.handleServiceCall(() => this.roleService.findAllRoles(), res);
	}

	private async findOne(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.handleServiceCall(() => this.roleService.findOneRole(id), res);
	}

	private async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const data = req.body;
		await this.handleServiceCall(() => this.roleService.updateRole(id, data), res);
	}

	private async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		await this.handleServiceCall(() => this.roleService.deleteRole(id), res);
	}
}
