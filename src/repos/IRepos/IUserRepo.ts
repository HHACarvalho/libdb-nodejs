import { User } from '../../domain/user/user';

export default interface IUserRepo {
	exists(email: string): Promise<boolean>;

	createUser(user: User): Promise<User>;

	findUser(email: string): Promise<User>;

	updateUser(user: User): Promise<User>;

	deleteUser(email: string): Promise<User>;
}
