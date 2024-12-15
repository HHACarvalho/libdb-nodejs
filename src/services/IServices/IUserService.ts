import Result from '../../core/result';

export default interface IUserService {
	signUp(reqBody: any): Promise<Result>;

	login(reqBody: any): Promise<Result>;

	findAllUsers(pageNumber: number, pageSize: number): Promise<Result>;

	findUsers(pageNumber: number, pageSize: number, firstName: string, lastName: string, email: string): Promise<Result>;

	findOneUser(id: string): Promise<Result>;

	updateProfile(id: string, reqBody: any): Promise<Result>;

	updateUserRole(userId: string, roleId: string): Promise<Result>;

	deleteCurrentUser(id: string): Promise<Result>;

	deleteUser(id: string): Promise<Result>;
}
