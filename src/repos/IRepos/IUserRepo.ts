import { User } from '../../domain/user';

export default interface IUserRepo {
	createUser(user: User): Promise<void>;

	findUsers(queryFilter?: any): Promise<User[]>;

	findOneUser(queryFilter?: any): Promise<User>;

	updateUserProfile(user: User): Promise<void>;

	updateUserRole(user: User): Promise<void>;

	deleteUser(email: string): Promise<User>;
}
