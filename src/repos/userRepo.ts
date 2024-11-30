import { TYPES } from '../../config';
import { IUserPersistence } from '../dtos/IUserDTO';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import IUserRepo from './IRepos/IUserRepo';

import { Document, Model } from 'mongoose';
import { inject, injectable } from 'inversify';

@injectable()
export default class UserRepo implements IUserRepo {
	constructor(@inject(TYPES.IUserSchema) private schema: Model<IUserPersistence & Document>) {}

	public async createUser(user: User): Promise<boolean> {
		const persistence = UserMapper.toPersistence(user);
		const document = await this.schema.create(persistence);
		if (document == null) {
			return false;
		}

		return true;
	}

	public async findAllUsers(): Promise<User[]> {
		const documents = await this.schema.find();
		return documents.map((e) => UserMapper.toDomain(e));
	}

	public async findUsers(email: string): Promise<User[]> {
		const documents = await this.schema.find({ email: { $regex: email, $options: 'i' } });
		return documents.map((e) => UserMapper.toDomain(e));
	}

	public async findOneUser(email: string): Promise<User | null> {
		const document = await this.schema.findOne({ email: email });
		if (document == null) {
			return null;
		}

		return UserMapper.toDomain(document);
	}

	public async updateUserProfile(user: User): Promise<boolean> {
		const document = await this.schema.findOneAndUpdate(
			{ _id: user.id.getValue() },
			{
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				$inc: { _version: 1 }
			}
		);

		if (document == null) {
			return false;
		}

		return true;
	}

	public async updateUserRole(user: User): Promise<boolean> {
		const document = await this.schema.findOneAndUpdate(
			{ _id: user.id.getValue() },
			{
				role: user.role,
				$inc: { _version: 1 }
			}
		);

		if (document == null) {
			return false;
		}

		return true;
	}

	public async deleteUser(email: string): Promise<boolean> {
		const document = await this.schema.findOneAndDelete({ email: email });
		if (document == null) {
			return false;
		}

		return true;
	}
}
