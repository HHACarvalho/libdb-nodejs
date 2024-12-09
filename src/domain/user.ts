import { Entity } from '../core/domain/entity';
import { EntityID } from '../core/domain/entityID';
import { IUserPersistence } from '../schemas/userSchema';

import { Model } from 'mongoose';

interface UserProps {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	roleId: string;
}

export default class User extends Entity<UserProps> {
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

	get roleId(): string {
		return this._props.roleId;
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

	set roleId(value: string) {
		this._props.roleId = value;
	}

	public static create(props: UserProps, id?: EntityID): User {
		return new User({ ...props }, id);
	}

	public static restore(schema: any | Model<IUserPersistence>): User {
		return User.create(
			{
				email: schema.email,
				password: schema.password,
				firstName: schema.firstName,
				lastName: schema.lastName,
				roleId: schema.roleId
			},
			new EntityID(schema._id)
		);
	}
}
