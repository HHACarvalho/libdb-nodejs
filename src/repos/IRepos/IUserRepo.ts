import User from '../../domain/user';

export default interface IUserRepo {
	createUser(user: User): Promise<boolean>;

	findUsers(pageNumber: number, pageSize: number, queryFilter?: any): Promise<User[]>;

	findOneUser(id: string): Promise<User | null>;

	findOneUserByEmail(email: string): Promise<User | null>;

	updateUserProfile(user: User): Promise<boolean>;

	updateUserRole(user: User): Promise<boolean>;

	deleteUser(id: string): Promise<boolean>;
}
