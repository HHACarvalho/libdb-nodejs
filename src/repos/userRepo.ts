import { TYPES } from '../../config';
import IUserRepo from './IRepos/IUserRepo';
import { IUserPersistence } from '../schemas/userSchema';
import User from '../domain/user';
import { UserDTO } from '../dtos/userDTO';

import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';

@injectable()
export default class UserRepo implements IUserRepo {
	constructor(@inject(TYPES.IUserSchema) private schema: Model<IUserPersistence>) {}

	public async createUser(user: User): Promise<boolean> {
		const persistence = UserDTO.persistence(user);
		const document = await this.schema.create(persistence);
		if (document == null) {
			return false;
		}

		return true;
	}

	public async findUsers(pageNumber: number, pageSize: number, queryFilter?: any): Promise<User[]> {
		const documents = await this.schema
			.find(queryFilter ? queryFilter : null)
			.skip((pageNumber - 1) * pageSize)
			.limit(pageSize);
		return documents.map((e) => User.restore(e));
	}

	public async findUsers(email: string): Promise<User[]> {
		const documents = await this.schema.find({ email: { $regex: email, $options: 'i' } });
		return documents.map((e) => User.restore(e));
	}

	public async findOneUser(email: string): Promise<User | null> {
		const document = await this.schema.findOne({ email: email });
		if (document == null) {
			return null;
		}

		return User.restore(document);
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
