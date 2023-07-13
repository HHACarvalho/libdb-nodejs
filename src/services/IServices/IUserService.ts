import { Result } from '../../core/Result';

export default interface IUserService {
	signUp(reqBody: any): Promise<Result<any>>;

	login(reqBody: any): Promise<Result<any>>;

	updateProfile(email: string, reqBody: any): Promise<Result<any>>;

	updateUserRole(email: string, role: string): Promise<Result<any>>;

	deleteUser(email: string): Promise<Result<any>>;
}
