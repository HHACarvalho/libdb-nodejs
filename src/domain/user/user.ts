import { Entity } from '../../core/domain/Entity';
import { EntityID } from '../../core/domain/EntityID';
import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { UserEmail } from './userEmail';
import { UserName } from './userName';
import { UserRole } from './userRole';

interface UserProps {
	email: UserEmail;
	firstName: UserName;
	lastName: UserName;
	role: UserRole;
	hidden: boolean;
}

export class User extends Entity<UserProps> {
	get email(): UserEmail {
		return this._props.email;
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

	get hidden(): boolean {
		return this._props.hidden;
	}

	set email(value: UserEmail) {
		this._props.email = value;
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

	set hidden(value: boolean) {
		this._props.hidden = value;
	}

	private constructor(props: UserProps, id?: EntityID) {
		super(props, id);
	}

	public static create(props: UserProps, id?: EntityID): Result<User> {
		const guardedProps = [
			{ argument: props.email, argumentName: 'email' },
			{ argument: props.firstName, argumentName: 'firstName' },
			{ argument: props.lastName, argumentName: 'lastName' },
			{ argument: props.role, argumentName: 'role' },
			{ argument: props.hidden, argumentName: 'hidden' },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<User>(guardResult.message);
		} else {
			return Result.ok<User>(new User({ ...props }, id));
		}
	}
}
