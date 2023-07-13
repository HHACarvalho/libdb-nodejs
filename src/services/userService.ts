import config from '../../config';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import { Result } from '../core/Result';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IUserService from './IServices/IUserService';

import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Inject, Service } from 'typedi';

@Service()
export default class UserService implements IUserService {
	constructor(@Inject(config.repos.user) private userRepoInstance: IUserRepo) {}

	public async signUp(dto: any): Promise<Result<any>> {
		try {
			const userExists = await this.userRepoInstance.exists(dto.email);
			if (userExists) {
				return Result.fail<any>('User with email=' + dto.email + ' already exists');
			}

			const hashedPassword = await hash(dto.password, 10);

			const obj = User.create({
				email: dto.email,
				password: hashedPassword,
				firstName: dto.firstName,
				lastName: dto.lastName,
				role: 'User',
			});

			const result = await this.userRepoInstance.createUser(obj);

			const token = this.signToken(UserMapper.toDTO(result));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async login(dto: any): Promise<Result<any>> {
		try {
			const obj = await this.userRepoInstance.findUser(dto.email);
			if (obj == null) {
				return Result.fail<any>('No user with email=' + dto.email + ' was found');
			}

			const isMatch = await compare(dto.password, obj.password);
			if (!isMatch) {
				return Result.fail<any>('Invalid password');
			}

			const token = this.signToken(UserMapper.toDTO(obj));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async updateProfile(email: string, reqBody: any): Promise<Result<any>> {
		try {
			const user = await this.userRepoInstance.findUser(email);
			if (user == null) {
				return Result.fail<any>('No user with email=' + reqBody.email + ' was found');
			}

			if (user.email != reqBody.email) {
				const userExists = await this.userRepoInstance.exists(email);
				if (!userExists) {
					return Result.fail<any>('No user with email=' + email + ' was found');
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
				return Result.fail<any>('No user with email=' + email + ' was found');
			}

			const roleExists = await this.roleRepoInstance.exists(role);
			if (!roleExists) {
				return Result.fail<any>('No role with name=' + role + ' was found');
			}

			user.role = role;

			const result = await this.userRepoInstance.updateUser(user);

			const token = this.signToken(UserMapper.toDTO(result));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async deleteUser(email: string): Promise<Result<any>> {
		try {
			const userExists = await this.userRepoInstance.exists(email);
			if (!userExists) {
				return Result.fail<any>('No user with email=' + email + ' was found');
			}

			await this.userRepoInstance.deleteUser(email);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	private signToken(dto: any): string {
		return sign(dto, config.jwtAccessSecret, { expiresIn: config.jwtDuration });
	}
}
