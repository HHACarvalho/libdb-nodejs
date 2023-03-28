import config from '../../config';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import IUserPersistence from '../dtos/IUserPersistence';
import IUserRepo from './IRepos/IUserRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class UserRepo implements IUserRepo {
	constructor(@Inject(config.schemas.user.name) private schema: Model<IUserPersistence & Document>) {}

	public async exists(email: string): Promise<boolean> {
		const document = await this.schema.findOne({ email: email });
		return !!document === true;
	}

	public async createUser(user: User): Promise<User> {
		try {
			const persistence = UserMapper.toPersistence(user);
			const document = await this.schema.create(persistence);
			return UserMapper.toDomain(document);
		} catch (e) {
			throw e;
		}
	}

	public async findUser(email: string): Promise<User> {
		const document = await this.schema.findOne({ email: email });
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(document);
	}

	public async updateUser(user: User): Promise<User> {
		try {
			const document = await this.schema.findOne({ email: user.email });

			document.email = user.email;
			document.password = user.password;
			document.firstName = user.firstName;
			document.lastName = user.lastName;
			document.role = user.role;

			const persisted = await document.save();
			return UserMapper.toDomain(persisted);
		} catch (e) {
			throw e;
		}
	}

	public async deleteUser(email: string): Promise<User> {
		const document = await this.schema.findOne({ email: email });
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(await document.remove());
	}
}
