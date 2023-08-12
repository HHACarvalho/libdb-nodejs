import { User } from '../../domain/user';

export default interface IUserRepo {
	createUser(user: User): Promise<User>;

	findUser(email: string): Promise<User>;

	updateUser(user: User): Promise<User>;

	deleteUser(email: string): Promise<User>;
}
