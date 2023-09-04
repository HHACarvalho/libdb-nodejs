import { User } from '../../domain/user';

export default interface IUserRepo {
	createUser(user: User): Promise<void>;

	findAllUsers(): Promise<User[]>;

	findUser(queryFilter: { _id: string } | { email: string }): Promise<User>;

	updateUserProfile(user: User): Promise<void>;

	updateUserRole(user: User): Promise<void>;

	deleteUser(email: string): Promise<User>;
}
