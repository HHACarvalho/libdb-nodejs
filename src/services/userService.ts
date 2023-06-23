import config from '../../config';
import { EntityID } from '../core/domain/EntityID';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import { Result } from '../core/Result';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IUserService from './IServices/IUserService';

import { Inject, Service } from 'typedi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Service()
export default class UserService implements IUserService {
	constructor(
		@Inject(config.repos.user) private userRepoInstance: IUserRepo,
		@Inject(config.repos.role) private roleRepoInstance: IRoleRepo
	) {}

	public async signUp(dto: any): Promise<Result<any>> {
		try {
			const userExists = await this.userRepoInstance.exists(dto.email);
			if (userExists) {
				return Result.fail<any>('User with email=' + dto.email + ' already exists');
			}

			const roleExists = await this.roleRepoInstance.exists(dto.role);
			if (!roleExists) {
				return Result.fail<any>('No role with name=' + dto.role + ' was found');
			}

			const hashedPassword = await bcrypt.hash(dto.password, 10);

			const obj = User.create(
				{
					email: dto.email,
					password: hashedPassword,
					firstName: dto.firstName,
					lastName: dto.lastName,
					role: dto.role,
				},
				new EntityID(dto.id)
			);

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

			const isMatch = await bcrypt.compare(dto.password, obj.password);
			if (!isMatch) {
				return Result.fail<any>('Invalid password');
			}

			const token = this.signToken(UserMapper.toDTO(obj));
			return Result.ok<any>(token);
		} catch (e) {
			throw e;
		}
	}

	public async updateUser(dto: any): Promise<Result<any>> {
		try {
			const obj = await this.userRepoInstance.findUser(dto.email);
			if (obj == null) {
				return Result.fail<any>('No user with email=' + dto.email + ' was found');
			}

			const roleExists = await this.roleRepoInstance.exists(dto.role);
			if (!roleExists) {
				return Result.fail<any>('No role with name=' + dto.role + ' was found');
			}

			const hashedPassword = await bcrypt.hash(dto.password, 10);

			if (dto.email) obj.email = dto.email;
			if (dto.password) obj.password = hashedPassword;
			if (dto.firstName) obj.firstName = dto.firstName;
			if (dto.lastName) obj.lastName = dto.lastName;
			if (dto.role) obj.role = dto.role;

			await this.userRepoInstance.updateUser(obj);
			return Result.ok<any>();
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
		return jwt.sign(dto, config.jwtAccessSecret, { expiresIn: config.jwtDuration });
	}

	private verifyToken(cookie: string): string {
		return jwt.verify(cookie, config.jwtAccessSecret);
	}
}
