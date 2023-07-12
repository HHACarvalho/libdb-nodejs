import { Entity } from '../core/domain/Entity';
import { EntityID } from '../core/domain/EntityID';

interface RoleProps {
	name: string;
	description: string;
}

export class Role extends Entity<RoleProps> {
	get name(): string {
		return this._props.name;
	}

	get description(): string {
		return this._props.description;
	}

	set name(value: string) {
		this._props.name = value;
	}

	set description(value: string) {
		this._props.description = value;
	}

	public static create(props: RoleProps, id?: EntityID): Role {
		return new Role({ ...props }, id);
	}
}
