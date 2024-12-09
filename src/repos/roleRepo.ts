import { TYPES } from '../../config';
import IRoleRepo from './IRepos/IRoleRepo';
import { IRolePersistence } from '../schemas/roleSchema';
import Role from '../domain/role';
import { RoleDTO } from '../dtos/roleDTO';

import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';

@injectable()
export default class RoleRepo implements IRoleRepo {
	constructor(@inject(TYPES.IRoleSchema) private schema: Model<IRolePersistence>) {}

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

	public async findOneRole(id: string): Promise<Role | null> {
		const document = await this.schema.findOne({ _id: id });
		if (document == null) {
			return null;
		}

		return Role.restore(document);
	}

	public async findOneRoleByName(name: string): Promise<Role | null> {
		const document = await this.schema.findOne({ name: name });
		if (document == null) {
			return null;
		}

		return Role.restore(document);
	}

	public async updateRole(id: string, role: Role): Promise<boolean> {
		const document = await this.schema.findOneAndUpdate(
			{ _id: id },
			{ name: role.name, permissions: role.permissions, $inc: { _version: 1 } }
		);

		if (document == null) {
			return false;
		}

		return true;
	}

	public async deleteRole(id: string): Promise<boolean> {
		const document = await this.schema.findOneAndDelete({ _id: id });
		if (document == null) {
			return false;
		}

		return true;
	}
}
