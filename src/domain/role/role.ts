import { Entity } from '../../core/domain/Entity';
import { EntityID } from '../../core/domain/EntityID';
import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { RoleName } from './roleName';
import { RoleDescription } from './roleDescription';

interface RoleProps {
	name: RoleName;
	description: RoleDescription;
}

export class Role extends Entity<RoleProps> {
	get name(): RoleName {
		return this._props.name;
	}

	get description(): RoleDescription {
		return this._props.description;
	}

	set name(value: RoleName) {
		this._props.name = value;
	}

	set description(value: RoleDescription) {
		this._props.description = value;
	}

	private constructor(props: RoleProps, id?: EntityID) {
		super(props, id);
	}

	public static create(props: RoleProps, id?: EntityID): Result<Role> {
		const guardedProps = [
			{ argument: props.name, argumentName: 'roleName' },
			{ argument: props.description, argumentName: 'roleDescription' },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
		if (!guardResult.succeeded) {
			return Result.fail<Role>(guardResult.message);
		}

		return Result.ok<Role>(new Role({ ...props }, id));
	}
}
