import Logger from '../core/loaders/loggerLoader';
import { User } from '../domain/user/user';
import { UserEmail } from '../domain/user/userEmail';
import { UserName } from '../domain/user/userName';
import { UserRole } from '../domain/user/userRole';
import { EntityID } from '../core/domain/EntityID';
import IUserDTO from '../dtos/IUserDTO';
import IUserPersistence from '../dtos/IUserPersistence';

import { Document, Model } from 'mongoose';

export class UserMapper {
	public static toDomain(schema: any | Model<IUserPersistence & Document>): User {
		const objOrError = User.create(
			{
				email: UserEmail.create(schema.email).value,
				firstName: UserName.create(schema.firstName).value,
				lastName: UserName.create(schema.lastName).value,
				role: UserRole.create(schema.role).value,
				hidden: schema.hidden,
			},
			new EntityID(schema.id)
		);

		if (!objOrError.isSuccess) {
			Logger.error(objOrError.error);
		}

		return objOrError.isSuccess ? objOrError.value : null;
	}

	public static toDTO(user: User): IUserDTO {
		return {
			email: user.email.value,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			role: user.role.value,
			hidden: user.hidden,
		} as IUserDTO;
	}

	public static toPersistence(user: User): IUserPersistence {
		return {
			domainId: user.id.toValue(),
			email: user.email.value,
			firstName: user.firstName.value,
			lastName: user.lastName.value,
			role: user.role.value,
			hidden: user.hidden,
		} as IUserPersistence;
	}
}
