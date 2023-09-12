import { EntityID } from '../core/domain/entityID';
import { IRoleDTO, IRolePersistence } from '../dtos/IRoleDTO';
import { Role } from '../domain/role';

import { Document, Model } from 'mongoose';

export class RoleMapper {
	public static toDomain(schema: any | Model<IRolePersistence & Document>): Role {
		return Role.create(
			{
				name: schema.name,
				permissions: schema.permissions,
			},
			new EntityID(schema._id)
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
			_id: role.id.getValue(),
			name: role.name,
			permissions: role.permissions,
		} as IRolePersistence;
	}
}
