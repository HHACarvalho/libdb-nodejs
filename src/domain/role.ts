import { Entity } from '../core/domain/entity';
import { EntityID } from '../core/domain/entityID';
import { IRolePersistence } from '../schemas/roleSchema';

import { Model } from 'mongoose';

interface RoleProps {
	name: string;
	permissions: string[];
}

export default class Role extends Entity<RoleProps> {
	get name(): string {
		return this._props.name;
	}

	get permissions(): any {
		return this._props.permissions;
	}

	set name(value: string) {
		this._props.name = value;
	}

	set permissions(value: any) {
		this._props.permissions = value;
	}

	public static create(props: RoleProps, id?: EntityID): Role {
		return new Role({ ...props }, id);
	}

	public static restore(schema: any | Model<IRolePersistence>): Role {
		return Role.create(
			{
				name: schema.name,
				permissions: schema.permissions
			},
			new EntityID(schema._id)
		);
	}
}
