import { CONFIG, TYPES } from '../../config';
import IUserService from './IServices/IUserService';
import IUserRepo from '../repos/IRepos/IUserRepo';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import User from '../domain/user';
import Result from '../core/result';
import { UserDTO } from '../dtos/userDTO';

import { inject, injectable } from 'inversify';
const { compare, hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');

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
			role: 'User' //TODO: Change to Id
		});

		await this.userRepo.createUser(user);

		const token = this.signToken(UserDTO.detailed(user));
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

		const token = this.signToken(UserDTO.detailed(user));
		return Result.ok(token);
	}

	public async findAllUsers(): Promise<Result> {
		const userList = await this.userRepo.findAllUsers();
		if (userList.length === 0) {
			return Result.fail('There are no users');
		}

		return Result.ok(userList.map((user) => UserDTO.simple(user)));
	}

	public async findUsers(email: string): Promise<Result> {
		const userList = await this.userRepo.findUsers(email);
		if (userList.length === 0) {
			return Result.fail('There are no users');
		}

		return Result.ok(userList.map((user) => UserDTO.simple(user)));
	}

	public async findOneUser(email: string): Promise<Result> {
		const user = await this.userRepo.findOneUser(email);
		if (user == null) {
			return Result.fail('No user with the id "' + email + '" was found');
		}

		return Result.ok(UserDTO.detailed(user));
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

		const token = this.signToken(UserDTO.detailed(user));
		return Result.ok(token);
	}

	public async updateUserRole(email: string, roleName: string): Promise<Result> {
		const user = await this.userRepo.findOneUser(email);
		if (user == null) {
			return Result.fail('No user with the email "' + email + '" was found');
		}

		//TODO: Change to Id
		if (roleName !== user.role) {
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
		return sign(data, CONFIG.JWT_ACCESS_SECRET, { expiresIn: CONFIG.JWT_DURATION });
	}
}
