import config from '../../config';
import { IUserPersistence } from '../dtos/IUserDTO';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import IUserRepo from './IRepos/IUserRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class UserRepo implements IUserRepo {
	constructor(@Inject(config.schemas.user) private schema: Model<IUserPersistence & Document>) {}

	public async createUser(user: User): Promise<User> {
		const persistence = UserMapper.toPersistence(user);
		const document = await this.schema.create(persistence);
		return UserMapper.toDomain(document);
	}

	public async findUser(email: string): Promise<User> {
		const document = await this.schema.findOne({ email: email });
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(document);
	}

	public async updateUser(user: User): Promise<User> {
		const document = await this.schema.findOne({ _id: user.id.getValue() });

		document.email = user.email;
		document.password = user.password;
		document.firstName = user.firstName;
		document.lastName = user.lastName;
		document.role = user.role;

		return UserMapper.toDomain(await document.save());
	}

	public async deleteUser(email: string): Promise<User> {
		const document = await this.schema.findOne({ email: email });
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(await document.remove());
	}
}
