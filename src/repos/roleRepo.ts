import config from '../../config';
import { Role } from '../domain/role/role';
import { RoleMapper } from '../mappers/roleMapper';
import IRolePersistence from '../dtos/IRolePersistence';
import IRoleRepo from './IRepos/IRoleRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleRepo implements IRoleRepo {
	constructor(@Inject(config.schemas.role.name) private schema: Model<IRolePersistence & Document>) {}

	public async exists(name: string): Promise<boolean> {
		const document = await this.schema.findOne({ name: name });
		return !!document === true;
	}

	public async createRole(role: Role): Promise<Role> {
		try {
			const persistence = RoleMapper.toPersistence(role);
			const persisted = await this.schema.create(persistence);
			return RoleMapper.toDomain(persisted);
		} catch (e) {
			throw e;
		}
	}

	public async getRole(name: string): Promise<Role> {
		const document = await this.schema.findOne({ name: name });
		if (document == null) {
			return null;
		}

		return RoleMapper.toDomain(document);
	}

	public async getAllRoles(): Promise<Role[]> {
		const documents = await this.schema.find();
		if (documents == null) {
			return null;
		}

		return documents.map((e) => RoleMapper.toDomain(e));
	}

	public async updateRole(role: Role): Promise<Role> {
		try {
			const document = await this.schema.findOne({ name: role.name.value });

			document.name = role.name.value;
			document.description = role.description.value;

			const persisted = await document.save();
			return RoleMapper.toDomain(persisted);
		} catch (e) {
			throw e;
		}
	}

	public async deleteRole(name: string): Promise<Role> {
		const document = await this.schema.findOne({ name: name });
		if (document == null) {
			return null;
		}

		return RoleMapper.toDomain(await document.remove());
	}
}
