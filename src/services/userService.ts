import config from '../../config';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import { Result } from '../core/result';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IUserService from './IServices/IUserService';

import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

@Service()
export default class UserService implements IUserService {
	constructor(
		@Inject(config.repos.user) private userRepoInstance: IUserRepo,
		@Inject(config.repos.role) private roleRepoInstance: IRoleRepo
	) {}

	public async signUp(reqBody: any): Promise<Result<any>> {
		try {
			const userExists = await this.userRepoInstance.exists(reqBody.email);
			if (userExists) {
				return Result.fail<any>('User with the email "' + reqBody.email + '" already exists');
			}

			const hashedPassword = await hash(reqBody.password, 10);

			const user = User.create({
				email: reqBody.email,
				password: hashedPassword,
				firstName: reqBody.firstName,
				lastName: reqBody.lastName,
				role: 'User',
			});

			const result = await this.userRepoInstance.createUser(user);

			const token = this.signToken(UserMapper.toDTO(result));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async login(reqBody: any): Promise<Result<any>> {
		try {
			const user = await this.userRepoInstance.findUser(reqBody.email);
			if (user == null) {
				return Result.fail<any>('No user with the email "' + reqBody.email + '" was found');
			}

			const passwordIsMatch = await compare(reqBody.password, user.password);
			if (!passwordIsMatch) {
				return Result.fail<any>('Incorrect password');
			}

			const token = this.signToken(UserMapper.toDTO(user));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async updateProfile(email: string, reqBody: any): Promise<Result<any>> {
		try {
			const user = await this.userRepoInstance.findUser(email);
			if (user == null) {
				return Result.fail<any>('No user with the email "' + reqBody.email + '" was found');
			}

			if (email != reqBody.email) {
				const userExists = await this.userRepoInstance.exists(reqBody.email);
				if (userExists) {
					return Result.fail<any>('User with the email "' + reqBody.email + '" already exists');
				}
			}

			const hashedPassword = await hash(reqBody.password, 10);

			user.email = reqBody.email;
			user.password = hashedPassword;
			user.firstName = reqBody.firstName;
			user.lastName = reqBody.lastName;

			const result = await this.userRepoInstance.updateUser(user);

			const token = this.signToken(UserMapper.toDTO(result));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async updateUserRole(email: string, role: string): Promise<Result<any>> {
		try {
			const user = await this.userRepoInstance.findUser(email);
			if (user == null) {
				return Result.fail<any>('No user with the email "' + email + '" was found');
			}

			const roleExists = await this.roleRepoInstance.exists(role);
			if (!roleExists) {
				return Result.fail<any>('No role with the name "' + role + '" was found');
			}

			user.role = role;

			await this.userRepoInstance.updateUser(user);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	public async deleteUser(email: string): Promise<Result<any>> {
		try {
			const userExists = await this.userRepoInstance.exists(email);
			if (!userExists) {
				return Result.fail<any>('No user with the email "' + email + '" was found');
			}

			await this.userRepoInstance.deleteUser(email);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	private signToken(data: any): string {
		return sign(data, config.jwtAccessSecret, { expiresIn: config.jwtDuration });
	}
}
