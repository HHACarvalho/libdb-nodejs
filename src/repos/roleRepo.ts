import config from '../../config';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';
import IRolePersistence from '../dtos/IRolePersistence';
import IRoleRepo from './IRepos/IRoleRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class RoleRepo implements IRoleRepo {
	constructor(@Inject(config.schemas.role) private schema: Model<IRolePersistence & Document>) {}

	public async exists(name: string): Promise<boolean> {
		const document = await this.schema.findOne({ name: name });
		return !!document === true;
	}

	public async createRole(role: Role): Promise<Role> {
		try {
			const persistence = RoleMapper.toPersistence(role);
			const document = await this.schema.create(persistence);
			return RoleMapper.toDomain(document);
		} catch (e) {
			throw e;
		}
	}

	public async findRole(name: string): Promise<Role> {
		const document = await this.schema.findOne({ name: name });
		if (document == null) {
			return null;
		}

		return RoleMapper.toDomain(document);
	}

	public async findAllRoles(): Promise<Role[]> {
		const documents = await this.schema.find();
		return documents.map((e) => RoleMapper.toDomain(e));
	}

	public async updateRole(role: Role): Promise<Role> {
		try {
			const document = await this.schema.findOne({ name: role.name });

			document.name = role.name;
			document.permissions = role.permissions;

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
