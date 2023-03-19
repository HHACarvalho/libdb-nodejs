import config from '../../config';
import { Role } from '../domain/role/role';
import { RoleName } from '../domain/role/roleName';
import { RoleDescription } from '../domain/role/roleDescription';
import { RoleMapper } from '../mappers/roleMapper';
import { Result } from '../core/infrastructure/Result';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

import { Inject, Service } from 'typedi';

@Service()
export default class RoleService implements IRoleService {
	constructor(@Inject(config.repos.role.name) private repoInstance: IRoleRepo) {}

	public async createRole(dto: any): Promise<Result<IRoleDTO>> {
		try {
			const exists = await this.repoInstance.exists(dto.name);
			if (exists) {
				return Result.fail<IRoleDTO>('Role with name=' + dto.name + ' already exists');
			}

			const objOrError = Role.create({
				name: RoleName.create(dto.name).value,
				description: RoleDescription.create(dto.description).value,
			});

			if (!objOrError.isSuccess) {
				return Result.fail<IRoleDTO>(objOrError.error);
			}

			const result = await this.repoInstance.createRole(objOrError.value);
			return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async getRole(name: string): Promise<Result<IRoleDTO>> {
		try {
			const obj = await this.repoInstance.getRole(name);
			if (obj == null) {
				return Result.fail<IRoleDTO>('No role with name=' + name + ' was found');
			}

			return Result.ok<IRoleDTO>(RoleMapper.toDTO(obj));
		} catch (e) {
			throw e;
		}
	}

	public async getAllRoles(): Promise<Result<IRoleDTO[]>> {
		try {
			const list = await this.repoInstance.getAllRoles();
			if (list == null) {
				return Result.fail<IRoleDTO[]>('There are no roles');
			}

			return Result.ok<IRoleDTO[]>(list.map((e) => RoleMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async updateRole(dto: any): Promise<Result<IRoleDTO>> {
		try {
			const obj = await this.repoInstance.getRole(dto.name);
			if (obj == null) {
				return Result.fail<IRoleDTO>('No role with name=' + dto.name + ' was found');
			}

			if (dto.name) obj.name = RoleName.create(dto.name).value;
			if (dto.description) obj.description = RoleDescription.create(dto.description).value;

			const result = await this.repoInstance.updateRole(obj);
			return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async deleteRole(name: string): Promise<Result<IRoleDTO>> {
		try {
			const exists = await this.repoInstance.exists(name);
			if (!exists) {
				return Result.fail<IRoleDTO>('No role with name=' + name + ' was found');
			}

			const result = await this.repoInstance.deleteRole(name);
			return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}
}
