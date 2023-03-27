import config from '../../config';
import { User } from '../domain/user/user';
import { UserEmail } from '../domain/user/userEmail';
import { UserPassword } from '../domain/user/userPassword';
import { UserName } from '../domain/user/userName';
import { UserRole } from '../domain/user/userRole';
import { UserMapper } from '../mappers/userMapper';
import { Result } from '../core/infrastructure/Result';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IUserDTO from '../dtos/IUserDTO';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IUserService from './IServices/IUserService';

import { Inject, Service } from 'typedi';

const bcrypt = require('bcrypt');

@Service()
export default class UserService implements IUserService {
	constructor(
		@Inject(config.repos.user.name) private userRepoInstance: IUserRepo,
		@Inject(config.repos.role.name) private roleRepoInstance: IRoleRepo
	) {}

	public async signUp(dto: any): Promise<Result<IUserDTO>> {
		try {
			const userExists = await this.userRepoInstance.exists(dto.email);
			if (userExists) {
				return Result.fail<IUserDTO>('User with email=' + dto.email + ' already exists');
			}

			const roleExists = await this.roleRepoInstance.exists(dto.role);
			if (!roleExists) {
				return Result.fail<IUserDTO>('No role with name=' + dto.role + ' was found');
			}

			const hashedPassword = await bcrypt.hash(dto.password, 10);

			const obj = User.create({
				email: UserEmail.create(dto.email).value,
				password: UserPassword.create(hashedPassword).value,
				firstName: UserName.create(dto.firstName, 'firstName').value,
				lastName: UserName.create(dto.lastName, 'lastName').value,
				role: UserRole.create(dto.role).value,
			});
			if (!obj.isSuccess) {
				return Result.fail<IUserDTO>(obj.error);
			}

			const result = await this.userRepoInstance.createUser(obj.value);
			return Result.ok<IUserDTO>(UserMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async login(dto: any): Promise<Result<IUserDTO>> {
		try {
			const obj = await this.userRepoInstance.findUser(dto.email);
			if (obj == null) {
				return Result.fail<IUserDTO>('No user with email=' + dto.email + ' was found');
			}

			const isMatch = await bcrypt.compare(dto.password, obj.password.value);
			if (!isMatch) {
				return Result.fail<IUserDTO>('Invalid password');
			}

			return Result.ok<IUserDTO>(UserMapper.toDTO(obj));
		} catch (e) {
			throw e;
		}
	}

	public async updateUser(dto: any): Promise<Result<IUserDTO>> {
		try {
			const obj = await this.userRepoInstance.findUser(dto.email);
			if (obj == null) {
				return Result.fail<IUserDTO>('No user with email=' + dto.email + ' was found');
			}

			const roleExists = await this.roleRepoInstance.exists(dto.role);
			if (!roleExists) {
				return Result.fail<IUserDTO>('No role with name=' + dto.role + ' was found');
			}

			const hashedPassword = await bcrypt.hash(dto.password, 10);

			if (dto.email) obj.email = UserEmail.create(dto.email).value;
			if (dto.password) obj.password = UserPassword.create(hashedPassword).value;
			if (dto.firstName) obj.firstName = UserName.create(dto.firstName, 'firstName').value;
			if (dto.lastName) obj.lastName = UserName.create(dto.lastName, 'lastName').value;
			if (dto.role) obj.role = UserRole.create(dto.role).value;

			const result = await this.userRepoInstance.updateUser(obj);
			return Result.ok<IUserDTO>(UserMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async deleteUser(email: string): Promise<Result<IUserDTO>> {
		try {
			const userExists = await this.userRepoInstance.exists(email);
			if (!userExists) {
				return Result.fail<IUserDTO>('No user with email=' + email + ' was found');
			}

			const result = await this.userRepoInstance.deleteUser(email);
			return Result.ok<IUserDTO>(UserMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}
}
