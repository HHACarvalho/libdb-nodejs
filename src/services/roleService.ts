import config from '../../config';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import { Result } from '../core/result';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

import { Inject, Service } from 'typedi';

@Service()
export default class RoleService implements IRoleService {
	constructor(@Inject(config.repos.role) private repoInstance: IRoleRepo) {}

	public async createRole(reqBody: any): Promise<Result<any>> {
		try {
			const roleExists = await this.repoInstance.exists(reqBody.name);
			if (roleExists) {
				return Result.fail<any>('Role with the name "' + reqBody.name + '" already exists');
			}

			const role = Role.create({
				name: reqBody.name,
				permissions: reqBody.permissions,
			});

			await this.repoInstance.createRole(role);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	public async findAllRoles(): Promise<Result<IRoleDTO[]>> {
		try {
			const roleList = await this.repoInstance.findAllRoles();
			if (roleList.length === 0) {
				return Result.fail<IRoleDTO[]>('There are no roles');
			}

			return Result.ok<IRoleDTO[]>(roleList.map((e) => RoleMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async updateRole(name: string, reqBody: any): Promise<Result<any>> {
		try {
			const role = await this.repoInstance.findRole(name);
			if (role == null) {
				return Result.fail<any>('No role with the name "' + name + '" was found');
			}

			role.name = reqBody.name;
			role.permissions = reqBody.permissions;

			await this.repoInstance.updateRole(role);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	public async deleteRole(name: string): Promise<Result<any>> {
		try {
			const roleExists = await this.repoInstance.exists(name);
			if (!roleExists) {
				return Result.fail<any>('No role with the name "' + name + '" was found');
			}

			await this.repoInstance.deleteRole(name);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}
}
