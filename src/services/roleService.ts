import { TYPES } from '../../config';
import { IRoleDTO } from '../dtos/IRoleDTO';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import { Result } from '../core/result';

import { inject, injectable } from 'inversify';

@injectable()
export default class RoleService implements IRoleService {
	constructor(@inject(TYPES.IRoleRepo) private repoInstance: IRoleRepo) {}

	public async createRole(reqBody: any): Promise<Result<IRoleDTO>> {
		const roleExists = await this.repoInstance.findOneRole(reqBody.name);
		if (roleExists) {
			return Result.fail<IRoleDTO>('Role with the name "' + reqBody.name + '" already exists');
		}

		const role = Role.create({
			name: reqBody.name,
			permissions: reqBody.permissions
		});

		const bResult = await this.repoInstance.createRole(role);
		if (!bResult) {
			return Result.fail<IRoleDTO>('Failed to create role');
		}

		return Result.ok<IRoleDTO>(RoleMapper.toDTO(role));
	}

	public async findAllRoles(): Promise<Result<IRoleDTO[]>> {
		const roleList = await this.repoInstance.findAllRoles();
		if (roleList.length === 0) {
			return Result.fail<IRoleDTO[]>('There are no roles');
		}

		return Result.ok<IRoleDTO[]>(roleList.map((e) => RoleMapper.toDTO(e)));
	}

	public async findRoles(roleName: string): Promise<Result<IRoleDTO[]>> {
		const roleList = await this.repoInstance.findRoles(roleName);
		if (roleList.length === 0) {
			return Result.fail<IRoleDTO[]>('No roles matching the criteria were found');
		}

		return Result.ok<IRoleDTO[]>(roleList.map((e) => RoleMapper.toDTO(e)));
	}

	public async findOneRole(roleName: string): Promise<Result<IRoleDTO>> {
		const role = await this.repoInstance.findOneRole(roleName);
		if (!role) {
			return Result.fail<IRoleDTO>('No role with the name "' + roleName + '" was found');
		}

		return Result.ok<IRoleDTO>(RoleMapper.toDTO(role));
	}

	public async updateRole(roleName: string, reqBody: any): Promise<Result<IRoleDTO>> {
		const role = await this.repoInstance.findOneRole(roleName);
		if (!role) {
			return Result.fail<IRoleDTO>('No role with the name "' + roleName + '" was found');
		}

		role.permissions = reqBody.permissions;

		const bResult = await this.repoInstance.updateRole(role);
		if (!bResult) {
			return Result.fail<IRoleDTO>('Failed to update role');
		}
		return Result.ok<IRoleDTO>();
	}

	public async deleteRole(roleName: string): Promise<Result<IRoleDTO>> {
		const bResult = await this.repoInstance.deleteRole(roleName);
		if (!bResult) {
			return Result.fail<IRoleDTO>('No role with the name "' + roleName + '" was found');
		}

		return Result.ok<IRoleDTO>();
	}
}
