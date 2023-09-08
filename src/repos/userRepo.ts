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

	public async createUser(user: User): Promise<void> {
		const persistence = UserMapper.toPersistence(user);
		await this.schema.create(persistence);
	}

	public async findAllUsers(): Promise<User[]> {
		const documents = await this.schema.find();
		return documents.map((e) => UserMapper.toDomain(e));
	}

	public async findUser(queryFilter: { _id: string } | { email: string }): Promise<User> {
		const document = await this.schema.findOne(queryFilter);
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(document);
	}

	public async updateUserProfile(user: User): Promise<void> {
		await this.schema.findOneAndUpdate(
			{ _id: user.id.getValue() },
			{
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				$inc: { _version: 1 },
			}
		);
	}

	public async updateUserRole(user: User): Promise<void> {
		await this.schema.findOneAndUpdate(
			{ _id: user.id.getValue() },
			{
				role: user.role,
				$inc: { _version: 1 },
			}
		);
	}

	public async deleteUser(email: string): Promise<User> {
		const document = await this.schema.findOneAndDelete({ email: email });
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(document);
	}
}
