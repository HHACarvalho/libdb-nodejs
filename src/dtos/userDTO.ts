import User from '../domain/user';
import { IUserPersistence } from '../schemas/userSchema';

import { z } from 'zod';

export const userSignUpBody = z.object({
	email: z.string().email(),
	password: z.string().min(2).max(32),
	firstName: z
		.string()
		.regex(/^\p{L}+$/u)
		.min(2)
		.max(32),
	lastName: z
		.string()
		.regex(/^\p{L}+$/u)
		.min(2)
		.max(32)
});

export const userLoginBody = z.object({
	email: z.string().email(),
	password: z.string().min(2).max(32)
});

export class UserDTO {
	public static simple(user: User): any {
		return {
			id: user.id.getValue(),
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.roleId
		};
	}

	public static detailed(user: User): any {
		return {
			id: user.id.getValue(),
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.roleId
		};
	}

	public static persistence(user: User): IUserPersistence {
		return {
			_id: user.id.getValue(),
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			roleId: user.roleId
		} as IUserPersistence;
	}
}
