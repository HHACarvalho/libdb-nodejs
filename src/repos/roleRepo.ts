import config from '../../config';
import IRoleRepo from './IRepos/IRoleRepo';
import { IRolePersistence } from '../schemas/roleSchema';
import Role from '../domain/role';
import { RoleDTO } from '../dtos/roleDTO';

import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';

@injectable()
export default class RoleRepo implements IRoleRepo {
	constructor(@inject(config.TYPES.IRoleSchema) private schema: Model<IRolePersistence>) {}

	public async createRole(role: Role): Promise<boolean> {
		const persistence = RoleDTO.persistence(role);
		const document = await this.schema.create(persistence);
		if (document == null) {
			return false;
		}

		return true;
	}

	public async findAllRoles(): Promise<Role[]> {
		const documents = await this.schema.find();
		return documents.map((e) => Role.restore(e));
	}

	public async findRoles(roleName: string): Promise<Role[]> {
		const documents = await this.schema.find({ name: { $regex: roleName, $options: 'i' } });
		return documents.map((e) => Role.restore(e));
	}

	public async findOneRole(roleName: string): Promise<Role | null> {
		const document = await this.schema.findOne({ name: roleName });
		if (document == null) {
			return null;
		}

		return Role.restore(document);
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
