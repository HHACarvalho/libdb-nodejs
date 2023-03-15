import config from '../../config';
import { User } from '../domain/user/user';
import { UserEmail } from '../domain/user/userEmail';
import { UserPassword } from '../domain/user/userPassword';
import { UserName } from '../domain/user/userName';
import { UserRole } from '../domain/user/userRole';
import { UserMapper } from '../mappers/userMapper';
import { Result } from '../core/infrastructure/Result';
import IUserDTO from '../dtos/IUserDTO';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IUserService from './IServices/IUserService';

import { Inject, Service } from 'typedi';

@Service()
export default class UserService implements IUserService {
	constructor(@Inject(config.repos.user.name) private repoInstance: IUserRepo) {}

	public async createUser(dto: any): Promise<Result<IUserDTO>> {
		try {
			const exists = await this.repoInstance.exists(dto.email);
			if (exists) {
				return Result.fail<IUserDTO>('User with email=' + dto.email + ' already exists');
			}

			const hashedPassword = await require('bcrypt').hash(dto.password, 10);
			//const isMatch = await bcrypt.compare(dto.password, hashedPassword);

			const objOrError = await User.create({
				email: UserEmail.create(dto.email).value,
				password: UserPassword.create(hashedPassword).value,
				firstName: UserName.create(dto.firstName, 'firstName').value,
				lastName: UserName.create(dto.lastName, 'lastName').value,
				role: UserRole.create(dto.role).value,
			});

			if (!objOrError.isSuccess) {
				return Result.fail<IUserDTO>(objOrError.error);
			}

			const result = await this.repoInstance.createUser(objOrError.value);
			return Result.ok<IUserDTO>(UserMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async getUser(email: string): Promise<Result<IUserDTO>> {
		try {
			const obj = await this.repoInstance.getUser(email);
			if (obj == null) {
				return Result.fail<IUserDTO>('No user with email=' + email + ' was found');
			}

			return Result.ok<IUserDTO>(UserMapper.toDTO(obj));
		} catch (e) {
			throw e;
		}
	}

	public async getAllUsers(): Promise<Result<IUserDTO[]>> {
		try {
			const list = await this.repoInstance.getAllUsers();
			if (list == null) {
				return Result.fail<IUserDTO[]>('There are no users');
			}

			return Result.ok<IUserDTO[]>(list.map((e) => UserMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async updateUser(dto: any): Promise<Result<IUserDTO>> {
		try {
			const obj = await this.repoInstance.getUser(dto.email);
			if (obj == null) {
				return Result.fail<IUserDTO>('No user with email=' + dto.email + ' was found');
			}

			if (dto.email) obj.email = UserEmail.create(dto.email).value;
			if (dto.password) obj.password = UserPassword.create(dto.password).value;
			if (dto.firstName) obj.firstName = UserName.create(dto.firstName, 'firstName').value;
			if (dto.lastName) obj.lastName = UserName.create(dto.lastName, 'lastName').value;
			if (dto.role) obj.role = UserRole.create(dto.role).value;

			const result = await this.repoInstance.updateUser(obj);
			return Result.ok<IUserDTO>(UserMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async deleteUser(email: string): Promise<Result<IUserDTO>> {
		try {
			const exists = await this.repoInstance.exists(email);
			if (!exists) {
				return Result.fail<IUserDTO>('No user with email=' + email + ' was found');
			}

			const result = await this.repoInstance.deleteUser(email);
			return Result.ok<IUserDTO>(UserMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}
}
