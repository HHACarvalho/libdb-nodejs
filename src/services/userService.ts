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
		const userExists = await this.userRepo.findOneUserByEmail(reqBody.email);
		if (userExists) {
			return Result.fail('User with the email "' + reqBody.email + '" already exists');
		}

		const role = await this.roleRepo.findOneRoleByName(CONFIG.DEFAULT_ROLE);
		if (!role) {
			return Result.fail('No role with the name "' + CONFIG.DEFAULT_ROLE + '" was found');
		}

		const hashedPassword = await hash(reqBody.password, 10);

		const user = User.create({
			email: reqBody.email,
			password: hashedPassword,
			firstName: reqBody.firstName,
			lastName: reqBody.lastName,
			roleId: role.id.getValue()
		});

		await this.userRepo.createUser(user);

		const token = this.signToken(UserDTO.detailed(user));
		return Result.ok({ set_token: token }, 201);
	}

	public async login(reqBody: any): Promise<Result> {
		const user = await this.userRepo.findOneUserByEmail(reqBody.email);
		if (user == null) {
			return Result.fail('No user with the email "' + reqBody.email + '" was found');
		}

		const passwordIsMatch = await compare(reqBody.password, user.password);
		if (!passwordIsMatch) {
			return Result.fail('Incorrect password');
		}

		const token = this.signToken(UserDTO.detailed(user));
		return Result.ok({ set_token: token });
	}

	public async findAllUsers(pageNumber: number, pageSize: number): Promise<Result> {
		const userList = await this.userRepo.findUsers(pageNumber, pageSize);
		if (userList.length === 0) {
			return Result.fail('There are no users');
		}

		return Result.ok(userList.map((user) => UserDTO.simple(user)));
	}

	public async findUsers(
		pageNumber: number,
		pageSize: number,
		firstName: string,
		lastName: string,
		email: string
	): Promise<Result> {
		const queryFilter = {};
		if (firstName !== '') Object.assign(queryFilter, { firstName: { $regex: firstName, $options: 'i' } });
		if (lastName !== '') Object.assign(queryFilter, { lastName: { $regex: lastName, $options: 'i' } });
		if (email !== '') Object.assign(queryFilter, { email: { $regex: email, $options: 'i' } });

		const userList = await this.userRepo.findUsers(pageNumber, pageSize, queryFilter);
		if (userList.length === 0) {
			return Result.fail('There are no users');
		}

		return Result.ok(userList.map((user) => UserDTO.simple(user)));
	}

	public async findOneUser(id: string): Promise<Result> {
		const user = await this.userRepo.findOneUser(id);
		if (user == null) {
			return Result.fail('No user with the id "' + id + '" was found');
		}

		return Result.ok(UserDTO.detailed(user));
	}

	public async updateProfile(id: string, reqBody: any): Promise<Result> {
		const user = await this.userRepo.findOneUser(id);
		if (user == null) {
			return Result.fail('No user with the id "' + id + '" was found');
		}

		if (user.email !== reqBody.email) {
			const userExists = await this.userRepo.findOneUserByEmail(reqBody.email);
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
		return Result.ok({ set_token: token });
	}

	public async updateUserRole(userId: string, roleId: string): Promise<Result> {
		const user = await this.userRepo.findOneUser(userId);
		if (user == null) {
			return Result.fail('No user with the id "' + userId + '" was found');
		}

		if (roleId !== user.roleId) {
			const roleExists = await this.roleRepo.findOneRole(roleId);
			if (!roleExists) {
				return Result.fail('No role with the id "' + roleId + '" was found');
			}
			user.roleId = roleExists.id.getValue();
		}

		await this.userRepo.updateUserRole(user);
		return Result.ok(null);
	}

	public async deleteCurrentUser(id: string): Promise<Result> {
		const result = await this.userRepo.deleteUser(id);
		if (!result) {
			return Result.fail('No user with the id "' + id + '" was found');
		}

		return Result.ok({ clear_token: true });
	}

	public async deleteUser(id: string): Promise<Result> {
		const result = await this.userRepo.deleteUser(id);
		if (!result) {
			return Result.fail('No user with the id "' + id + '" was found');
		}

		return Result.ok(null);
	}

	private signToken(data: any): string {
		return sign(data, CONFIG.JWT_ACCESS_SECRET, { expiresIn: CONFIG.JWT_DURATION });
	}
}
