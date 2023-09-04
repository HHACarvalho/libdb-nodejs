import config from '../../config';
import { IRolePersistence } from '../dtos/IRoleDTO';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import IRoleRepo from './IRepos/IRoleRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleRepo implements IRoleRepo {
	constructor(@Inject(config.schemas.role) private schema: Model<IRolePersistence & Document>) {}

	public async createRole(role: Role): Promise<void> {
		const persistence = RoleMapper.toPersistence(role);
		await this.schema.create(persistence);
	}

	public async findRole(roleName: string): Promise<Role> {
		const document = await this.schema.findOne({ name: roleName });
		if (document == null) {
			return null;
		}

		return RoleMapper.toDomain(document);
	}

	public async findAllRoles(): Promise<Role[]> {
		const documents = await this.schema.find();
		return documents.map((e) => RoleMapper.toDomain(e));
	}

	public async updateRole(role: Role): Promise<void> {
		await this.schema.findOneAndUpdate({ name: role.name }, { permissions: role.permissions });
	}

	public async deleteRole(roleName: string): Promise<Role> {
		const document = await this.schema.findOneAndDelete({ name: roleName });
		if (document == null) {
			return null;
		}

		return RoleMapper.toDomain(document);
	}
}
