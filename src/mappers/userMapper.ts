import { IUserDTO, IUserLiteDTO, IUserPersistence } from '../dtos/IUserDTO';
import User from '../domain/user';
import { EntityID } from '../core/domain/entityID';

import { Document, Model } from 'mongoose';

export class UserMapper {
	public static toDomain(schema: any | Model<IUserPersistence & Document>): User {
		return User.create(
			{
				email: schema.email,
				password: schema.password,
				firstName: schema.firstName,
				lastName: schema.lastName,
				role: schema.role
			},
			new EntityID(schema._id)
		);
	}

	public static toDTO(user: User): IUserDTO {
		return {
			id: user.id.getValue(),
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role
		} as IUserDTO;
	}

	public static toLiteDTO(user: User): IUserLiteDTO {
		return {
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role
		} as IUserLiteDTO;
	}

	public static toPersistence(user: User): IUserPersistence {
		return {
			_id: user.id.getValue(),
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role
		} as IUserPersistence;
	}
}
