import { Entity } from '../core/domain/Entity';
import { EntityID } from '../core/domain/EntityID';

export enum Permissions {
	manageMovies,
	manageRoles,
	manageUsers,
}

interface RoleProps {
	name: string;
	permissions: {
		manageMovies: boolean;
		manageRoles: boolean;
		manageUsers: boolean;
	};
}

export class Role extends Entity<RoleProps> {
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
}
