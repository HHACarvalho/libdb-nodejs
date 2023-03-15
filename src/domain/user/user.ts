import { Entity } from '../../core/domain/Entity';
import { EntityID } from '../../core/domain/EntityID';
import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { UserName } from './userName';
import { UserRole } from './userRole';

interface UserProps {
	email: UserEmail;
	password: UserPassword;
	firstName: UserName;
	lastName: UserName;
	role: UserRole;
}

export class User extends Entity<UserProps> {
	get email(): UserEmail {
		return this._props.email;
	}

	get password(): UserPassword {
		return this._props.password;
	}

	get firstName(): UserName {
		return this._props.firstName;
	}

	get lastName(): UserName {
		return this._props.lastName;
	}

	get role(): UserRole {
		return this._props.role;
	}

	set email(value: UserEmail) {
		this._props.email = value;
	}

	set password(value: UserPassword) {
		this._props.password = value;
	}

	set firstName(value: UserName) {
		this._props.firstName = value;
	}

	set lastName(value: UserName) {
		this._props.lastName = value;
	}

	set role(value: UserRole) {
		this._props.role = value;
	}

	private constructor(props: UserProps, id?: EntityID) {
		super(props, id);
	}

	public static create(props: UserProps, id?: EntityID): Result<User> {
		const guardedProps = [
			{ argument: props.email, argumentName: 'userEmail' },
			{ argument: props.password, argumentName: 'userPassword' },
			{ argument: props.firstName, argumentName: 'userFirstName' },
			{ argument: props.lastName, argumentName: 'userLastName' },
			{ argument: props.role, argumentName: 'userRole' },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
		if (!guardResult.succeeded) {
			return Result.fail<User>(guardResult.message);
		}

		return Result.ok<User>(new User({ ...props }, id));
	}
}
