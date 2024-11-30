import { User } from '../../domain/user';

export default interface IUserRepo {
	createUser(user: User): Promise<boolean>;

	findAllUsers(queryFilter?: any): Promise<User[]>;

	findUsers(email: string): Promise<User[]>;

	findOneUser(email: string): Promise<User | null>;

	updateUserProfile(user: User): Promise<boolean>;

	updateUserRole(user: User): Promise<boolean>;

	deleteUser(email: string): Promise<boolean>;
}
