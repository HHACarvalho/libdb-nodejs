import { TYPES } from '../../config';
import IRoleService from './IServices/IRoleService';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import Role from '../domain/role';
import Result from '../core/result';
import { RoleDTO } from '../dtos/roleDTO';

import { inject, injectable } from 'inversify';

@injectable()
export default class RoleService implements IRoleService {
	constructor(@inject(TYPES.IRoleRepo) private repoInstance: IRoleRepo) {}

	public async createRole(reqBody: any): Promise<Result> {
		const roleExists = await this.repoInstance.findOneRoleByName(reqBody.name);
		if (roleExists) {
			return Result.fail('Role with the name "' + reqBody.name + '" already exists');
		}

		const role = Role.create({
			name: reqBody.name,
			permissions: reqBody.permissions
		});

		const bResult = await this.repoInstance.createRole(role);
		if (!bResult) {
			return Result.fail('Failed to create role');
		}

		return Result.ok(RoleDTO.detailed(role), 201);
	}

	public async findAllRoles(): Promise<Result> {
		const roleList = await this.repoInstance.findAllRoles();
		if (roleList.length === 0) {
			return Result.fail('There are no roles');
		}

		return Result.ok(roleList.map((role) => RoleDTO.detailed(role)));
	}

	public async findOneRole(id: string): Promise<Result> {
		const role = await this.repoInstance.findOneRole(id);
		if (!role) {
			return Result.fail('No role with the id "' + id + '" was found');
		}

		return Result.ok(RoleDTO.detailed(role));
	}

	public async updateRole(id: string, reqBody: any): Promise<Result> {
		const role = await this.repoInstance.findOneRole(id);
		if (!role) {
			return Result.fail('No role with the id "' + id + '" was found');
		}

		if (role.name !== reqBody.name) {
			const existingRole = await this.repoInstance.findOneRoleByName(reqBody.name);
			if (existingRole) {
				return Result.fail('Role with the name "' + reqBody.name + '" already exists');
			}
			role.name = reqBody.name;
		}

		role.permissions = reqBody.permissions;

		const bResult = await this.repoInstance.updateRole(id, role);
		if (!bResult) {
			return Result.fail('Failed to update role');
		}
		return Result.ok(null);
	}

	public async deleteRole(id: string): Promise<Result> {
		const bResult = await this.repoInstance.deleteRole(id);
		if (!bResult) {
			return Result.fail('No role with the id "' + id + '" was found');
		}

		return Result.ok(null);
	}
}
