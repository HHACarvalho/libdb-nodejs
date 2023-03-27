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
			const roleExists = await this.repoInstance.exists(dto.name);
			if (roleExists) {
				return Result.fail<IRoleDTO>('Role with name=' + dto.name + ' already exists');
			}

			const obj = Role.create({
				name: RoleName.create(dto.name).value,
				description: RoleDescription.create(dto.description).value,
			});
			if (!obj.isSuccess) {
				return Result.fail<IRoleDTO>(obj.error);
			}

			const result = await this.repoInstance.createRole(obj.value);
			return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async findAllRoles(): Promise<Result<IRoleDTO[]>> {
		try {
			const list = await this.repoInstance.findAllRoles();
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
			const obj = await this.repoInstance.findRole(dto.name);
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
			const roleExists = await this.repoInstance.exists(name);
			if (!roleExists) {
				return Result.fail<IRoleDTO>('No role with name=' + name + ' was found');
			}

			const result = await this.repoInstance.deleteRole(name);
			return Result.ok<IRoleDTO>(RoleMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}
}
