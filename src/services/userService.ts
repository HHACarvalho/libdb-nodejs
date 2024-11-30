import config from '../../config';
import { TYPES } from '../../config';
import { IUserDTO, IUserLiteDTO } from '../dtos/IUserDTO';
import { Result } from '../core/result';
import { User } from '../domain/user';
import { UserMapper } from '../mappers/userMapper';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IUserService from './IServices/IUserService';

import { compare, hash } from 'bcrypt';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';

@injectable()
export default class UserService implements IUserService {
	constructor(
		@inject(TYPES.IUserRepo) private userRepo: IUserRepo,
		@inject(TYPES.IRoleRepo) private roleRepo: IRoleRepo
	) {}

	public async signUp(reqBody: any): Promise<Result> {
		const userExists = await this.userRepo.findOneUser(reqBody.email);
		if (userExists) {
			return Result.fail('User with the email "' + reqBody.email + '" already exists');
		}

		const hashedPassword = await hash(reqBody.password, 10);

		const user = User.create({
			email: reqBody.email,
			password: hashedPassword,
			firstName: reqBody.firstName,
			lastName: reqBody.lastName,
			role: 'User' //TODO: Change to ID
		});

		await this.userRepo.createUser(user);

		const token = this.signToken(UserMapper.toDTO(user));
		return Result.ok(token, 201);
	}

	public async login(reqBody: any): Promise<Result> {
		const user = await this.userRepo.findOneUser(reqBody.email);
		if (user == null) {
			return Result.fail('No user with the email "' + reqBody.email + '" was found');
		}

		const passwordIsMatch = await compare(reqBody.password, user.password);
		if (!passwordIsMatch) {
			return Result.fail('Incorrect password');
		}

		const token = this.signToken(UserMapper.toDTO(user));
		return Result.ok(token);
	}

	public async findAllUsers(): Promise<Result> {
		const userList = await this.userRepo.findAllUsers();
		if (userList.length === 0) {
			return Result.fail('There are no users');
		}

		return Result.ok(userList.map((e) => UserMapper.toLiteDTO(e)));
	}

	public async findUsers(email: string): Promise<Result> {
		const userList = await this.userRepo.findUsers(email);
		if (userList.length === 0) {
			return Result.fail('There are no users');
		}

		return Result.ok(userList.map((e) => UserMapper.toLiteDTO(e)));
	}

	public async findOneUser(email: string): Promise<Result> {
		const user = await this.userRepo.findOneUser(email);
		if (user == null) {
			return Result.fail('No user with the id "' + email + '" was found');
		}

		return Result.ok(UserMapper.toLiteDTO(user));
	}

	public async updateProfile(email: string, reqBody: any): Promise<Result> {
		const user = await this.userRepo.findOneUser(email);
		if (user == null) {
			return Result.fail('No user with the email "' + email + '" was found');
		}

		if (email !== reqBody.email) {
			const userExists = await this.userRepo.findOneUser(reqBody.email);
			if (userExists) {
				return Result.fail('User with the email "' + reqBody.email + '" already exists');
			}
			user.email = reqBody.email;
		}

		const hashedPassword = await hash(reqBody.password, 10);

		user.password = hashedPassword;
		user.firstName = reqBody.firstName;
		user.lastName = reqBody.lastName;

		await this.userRepo.updateUserProfile(user);

		const token = this.signToken(UserMapper.toDTO(user));
		return Result.ok(token);
	}

	public async updateUserRole(email: string, roleName: string): Promise<Result> {
		const user = await this.userRepo.findOneUser(email);
		if (user == null) {
			return Result.fail('No user with the email "' + email + '" was found');
		}

		if (roleName !== config.defaultRole) {
			//TODO: defaultRole???
			const roleExists = await this.roleRepo.findOneRole(roleName);
			if (!roleExists) {
				return Result.fail('No role with the name "' + roleName + '" was found');
			}
		}

		user.role = roleName;

		await this.userRepo.updateUserRole(user);
		return Result.ok(null);
	}

	public async deleteUser(email: string): Promise<Result> {
		const result = await this.userRepo.deleteUser(email);
		if (!result) {
			return Result.fail('No user with the email "' + email + '" was found');
		}

		return Result.ok(null);
	}

	private signToken(data: any): string {
		return sign(data, config.jwtAccessSecret, { expiresIn: config.jwtDuration });
	}
}
