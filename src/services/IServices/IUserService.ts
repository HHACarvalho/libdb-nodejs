import { Result } from '../../core/result';

export default interface IUserService {
	signUp(reqBody: any): Promise<Result<string>>;

	login(reqBody: any): Promise<Result<string>>;

	updateProfile(email: string, reqBody: any): Promise<Result<string>>;

	updateUserRole(email: string, role: string): Promise<Result<any>>;

	deleteUser(email: string): Promise<Result<any>>;
}
