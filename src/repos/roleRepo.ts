import { TYPES } from '../../config';
import IRoleRepo from './IRepos/IRoleRepo';
import { IRolePersistence } from '../dtos/IRoleDTO';
import { Role } from '../domain/role';
import { RoleMapper } from '../mappers/roleMapper';

import { inject, injectable } from 'inversify';
import { Document, Model } from 'mongoose';

@injectable()
export default class RoleRepo implements IRoleRepo {
	constructor(@inject(TYPES.IRoleSchema) private schema: Model<IRolePersistence & Document>) {}

	public async createRole(role: Role): Promise<boolean> {
		const persistence = RoleMapper.toPersistence(role);
		const document = await this.schema.create(persistence);
		if (document == null) {
			return false;
		}

		return true;
	}

	public async findAllRoles(): Promise<Role[]> {
		const documents = await this.schema.find();
		return documents.map((e) => RoleMapper.toDomain(e));
	}

	public async findRoles(roleName: string): Promise<Role[]> {
		const documents = await this.schema.find({ name: { $regex: roleName, $options: 'i' } });
		return documents.map((e) => RoleMapper.toDomain(e));
	}

	public async findOneRole(roleName: string): Promise<Role | null> {
		const document = await this.schema.findOne({ name: roleName });
		if (document == null) {
			return null;
		}

		return RoleMapper.toDomain(document);
	}

	public async updateRole(roleName: string, role: Role): Promise<boolean> {
		const document = await this.schema.findOneAndUpdate(
			{ name: roleName },
			{ name: role.name, permissions: role.permissions, $inc: { _version: 1 } }
		);

		if (document == null) {
			return false;
		}

		return true;
	}

	public async deleteRole(roleName: string): Promise<boolean> {
		const document = await this.schema.findOneAndDelete({ name: roleName });
		if (document == null) {
			return false;
		}

		return true;
	}
}
