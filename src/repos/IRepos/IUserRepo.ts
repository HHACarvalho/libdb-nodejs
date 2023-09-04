import { User } from '../../domain/user';

export default interface IUserRepo {
	createUser(user: User): Promise<void>;

	findUser(queryFilter: any): Promise<User>;

	updateUserProfile(user: User): Promise<void>;

	updateUserRole(user: User): Promise<void>;

	deleteUser(email: string): Promise<User>;
}
