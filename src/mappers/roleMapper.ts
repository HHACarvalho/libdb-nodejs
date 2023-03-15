import Logger from '../core/loaders/loggerLoader';
import { Role } from '../domain/role/role';
import { RoleName } from '../domain/role/roleName';
import { RoleDescription } from '../domain/role/roleDescription';
import { EntityID } from '../core/domain/EntityID';
import IRoleDTO from '../dtos/IRoleDTO';
import IRolePersistence from '../dtos/IRolePersistence';

import { Document, Model } from 'mongoose';

export class RoleMapper {
	public static toDomain(schema: any | Model<IRolePersistence & Document>): Role {
		const objOrError = Role.create(
			{
				name: RoleName.create(schema.name).value,
				description: RoleDescription.create(schema.description).value,
			},
			new EntityID(schema.id)
		);

		if (!objOrError.isSuccess) {
			Logger.error(objOrError.error);
		}

		return objOrError.isSuccess ? objOrError.value : null;
	}

	public static toDTO(role: Role): IRoleDTO {
		return {
			name: role.name.value,
			description: role.description.value,
		} as IRoleDTO;
	}

	public static toPersistence(role: Role): IRolePersistence {
		return {
			_id: role.id.toValue(),
			name: role.name.value,
			description: role.description.value,
		} as IRolePersistence;
	}
}
