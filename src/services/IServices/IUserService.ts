import Result from '../../core/result';

export default interface IUserService {
	signUp(reqBody: any): Promise<Result>;

	login(reqBody: any): Promise<Result>;

	findAllUsers(): Promise<Result>;

	findUsers(email: string): Promise<Result>;

	findOneUser(email: string): Promise<Result>;

	updateProfile(email: string, reqBody: any): Promise<Result>;

	updateUserRole(email: string, roleName: string): Promise<Result>;

	deleteUser(email: string): Promise<Result>;
}
