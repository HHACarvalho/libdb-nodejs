import { Role } from '../domain/role';
import { EntityID } from '../core/domain/entityID';
import IRoleDTO from '../dtos/IRoleDTO';
import IRolePersistence from '../dtos/IRolePersistence';

import { Document, Model } from 'mongoose';

export class RoleMapper {
	public static toDomain(schema: any | Model<IRolePersistence & Document>): Role {
		return Role.create(
			{
				name: schema.name,
				permissions: schema.permissions,
			},
			new EntityID(schema.id)
		);
	}

	public static toDTO(role: Role): IRoleDTO {
		return {
			name: role.name,
			permissions: role.permissions,
		} as IRoleDTO;
	}

	public static toPersistence(role: Role): IRolePersistence {
		return {
			_id: role.id.toValue(),
			name: role.name,
			permissions: role.permissions,
		} as IRolePersistence;
	}
}
