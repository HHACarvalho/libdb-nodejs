import config from '../../config';
import { EntityID } from '../core/domain/EntityID';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import { Result } from '../core/Result';
import IRoleDTO from '../dtos/IRoleDTO';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';

import { Inject, Service } from 'typedi';

@Service()
export default class RoleService implements IRoleService {
	constructor(@Inject(config.repos.role) private repoInstance: IRoleRepo) {}

	public async createRole(dto: any): Promise<Result<any>> {
		try {
			const roleExists = await this.repoInstance.exists(dto.name);
			if (roleExists) {
				return Result.fail<any>('Role with name=' + dto.name + ' already exists');
			}

			const obj = Role.create(
				{
					name: dto.name,
					description: dto.description,
				},
				new EntityID(dto.id)
			);

			await this.repoInstance.createRole(obj);
			return Result.ok<any>();
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

	public async updateRole(dto: any): Promise<Result<any>> {
		try {
			const obj = await this.repoInstance.findRole(dto.name);
			if (obj == null) {
				return Result.fail<any>('No role with name=' + dto.name + ' was found');
			}

			if (dto.name) obj.name = dto.name;
			if (dto.description) obj.description = dto.description;

			await this.repoInstance.updateRole(obj);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	public async deleteRole(name: string): Promise<Result<any>> {
		try {
			const roleExists = await this.repoInstance.exists(name);
			if (!roleExists) {
				return Result.fail<any>('No role with name=' + name + ' was found');
			}

			await this.repoInstance.deleteRole(name);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}
}
