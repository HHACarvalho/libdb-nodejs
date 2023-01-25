import { User } from '../../domain/user/user';

export default interface IUserRepo {
	exists(email: string): Promise<boolean>;

	save(user: User): Promise<User>;

	getAllUsers(): Promise<User[]>;

	getUser(email: string): Promise<User>;

	deleteUser(email: string): Promise<User>;
}
