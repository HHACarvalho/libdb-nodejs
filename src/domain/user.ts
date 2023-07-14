import { Entity } from '../core/domain/entity';
import { EntityID } from '../core/domain/entityID';

interface UserProps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
}

export class User extends Entity<UserProps> {
	get email(): string {
		return this._props.email;
	}

	get password(): string {
		return this._props.password;
	}

	get firstName(): string {
		return this._props.firstName;
	}

	get lastName(): string {
		return this._props.lastName;
	}

	get role(): string {
		return this._props.role;
	}

	set email(value: string) {
		this._props.email = value;
	}

	set password(value: string) {
		this._props.password = value;
	}

	set firstName(value: string) {
		this._props.firstName = value;
	}

	set lastName(value: string) {
		this._props.lastName = value;
	}

	set role(value: string) {
		this._props.role = value;
	}

	public static create(props: UserProps, id?: EntityID): User {
		return new User({ ...props }, id);
	}
}
