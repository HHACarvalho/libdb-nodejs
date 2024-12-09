import Role from '../domain/role';
import { IRolePersistence } from '../schemas/roleSchema';

import { z } from 'zod';

export const roleCreateBody = z.object({
	name: z.string().min(2).max(32),
	permissions: z.array(z.string())
});

export class RoleDTO {
	public static detailed(role: Role): any {
		return {
			id: role.id.getValue(),
			name: role.name,
			permissions: role.permissions
		};
	}

	public static persistence(role: Role): IRolePersistence {
		return {
			_id: role.id.getValue(),
			name: role.name,
			permissions: role.permissions
		} as IRolePersistence;
	}
}
