import config from '../../config';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import { Result } from '../core/result';
import IUserDTO from '../dtos/IUserDTO';
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

	public async signUp(reqBody: any): Promise<Result<string>> {
		const userExists = await this.userRepoInstance.findUser(reqBody.email);
		if (userExists) {
			return Result.fail<string>('User with the email "' + reqBody.email + '" already exists');
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
		return Result.ok<string>(token);
	}

	public async login(reqBody: any): Promise<Result<string>> {
		const user = await this.userRepoInstance.findUser(reqBody.email);
		if (user == null) {
			return Result.fail<string>('No user with the email "' + reqBody.email + '" was found');
		}

		const passwordIsMatch = await compare(reqBody.password, user.password);
		if (!passwordIsMatch) {
			return Result.fail<string>('Incorrect password');
		}

		const token = this.signToken(UserMapper.toDTO(user));
		return Result.ok<string>(token);
	}

	public async updateProfile(userEmail: string, reqBody: any): Promise<Result<string>> {
		const user = await this.userRepoInstance.findUser(userEmail);
		if (user == null) {
			return Result.fail<string>('No user with the email "' + reqBody.email + '" was found');
		}

		if (userEmail != reqBody.email) {
			const userExists = await this.userRepoInstance.findUser(reqBody.email);
			if (userExists) {
				return Result.fail<string>('User with the email "' + reqBody.email + '" already exists');
			}
		}

		const hashedPassword = await hash(reqBody.password, 10);

		user.email = reqBody.email;
		user.password = hashedPassword;
		user.firstName = reqBody.firstName;
		user.lastName = reqBody.lastName;

		const result = await this.userRepoInstance.updateUser(user);

		const token = this.signToken(UserMapper.toDTO(result));
		return Result.ok<string>(token);
	}

	public async updateUserRole(userEmail: string, roleName: string): Promise<Result<IUserDTO>> {
		const user = await this.userRepoInstance.findUser(userEmail);
		if (user == null) {
			return Result.fail<IUserDTO>('No user with the email "' + userEmail + '" was found');
		}

		const roleExists = await this.roleRepoInstance.findRole(roleName);
		if (!roleExists) {
			return Result.fail<IUserDTO>('No role with the name "' + roleName + '" was found');
		}

		user.role = roleName;

		await this.userRepoInstance.updateUser(user);
		return Result.ok<IUserDTO>();
	}

	public async deleteUser(userEmail: string): Promise<Result<IUserDTO>> {
		const userExists = await this.userRepoInstance.findUser(userEmail);
		if (!userExists) {
			return Result.fail<IUserDTO>('No user with the email "' + userEmail + '" was found');
		}

		await this.userRepoInstance.deleteUser(userEmail);
		return Result.ok<IUserDTO>();
	}

	private signToken(data: any): string {
		return sign(data, config.jwtAccessSecret, { expiresIn: config.jwtDuration });
	}
}
