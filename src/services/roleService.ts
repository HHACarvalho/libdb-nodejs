import { TYPES } from '../../config';
import IRoleService from './IServices/IRoleService';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import Role from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import Result from '../core/result';

import { inject, injectable } from 'inversify';

@injectable()
export default class RoleService implements IRoleService {
	constructor(@inject(TYPES.IRoleRepo) private repoInstance: IRoleRepo) {}

	public async createRole(reqBody: any): Promise<Result> {
		const roleExists = await this.repoInstance.findOneRole(reqBody.name);
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

		return Result.ok(RoleMapper.toDTO(role), 201);
	}

	public async findAllRoles(): Promise<Result> {
		const roleList = await this.repoInstance.findAllRoles();
		if (roleList.length === 0) {
			return Result.fail('There are no roles');
		}

		return Result.ok(roleList.map((e) => RoleMapper.toDTO(e)));
	}

	public async findRoles(roleName: string): Promise<Result> {
		const roleList = await this.repoInstance.findRoles(roleName);
		if (roleList.length === 0) {
			return Result.fail('No roles matching the criteria were found');
		}

		return Result.ok(roleList.map((e) => RoleMapper.toDTO(e)));
	}

	public async findOneRole(roleName: string): Promise<Result> {
		const role = await this.repoInstance.findOneRole(roleName);
		if (!role) {
			return Result.fail('No role with the name "' + roleName + '" was found');
		}

		return Result.ok(RoleMapper.toDTO(role));
	}

	public async updateRole(roleName: string, reqBody: any): Promise<Result> {
		const role = await this.repoInstance.findOneRole(roleName);
		if (!role) {
			return Result.fail('No role with the name "' + roleName + '" was found');
		}

		if (roleName !== reqBody.name) {
			const existingRole = await this.repoInstance.findOneRole(reqBody.name);
			if (existingRole) {
				return Result.fail('Role with the name "' + reqBody.name + '" already exists');
			}
			role.name = reqBody.name;
		}

		role.permissions = reqBody.permissions;

		const bResult = await this.repoInstance.updateRole(roleName, role);
		if (!bResult) {
			return Result.fail('Failed to update role');
		}
		return Result.ok(null);
	}

	public async deleteRole(roleName: string): Promise<Result> {
		const bResult = await this.repoInstance.deleteRole(roleName);
		if (!bResult) {
			return Result.fail('No role with the name "' + roleName + '" was found');
		}

		return Result.ok(null);
	}
}
