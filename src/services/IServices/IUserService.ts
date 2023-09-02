import { Result } from '../../core/result';
import IUserDTO from '../../dtos/IUserDTO';

export default interface IUserService {
	signUp(reqBody: any): Promise<Result<string>>;

	login(reqBody: any): Promise<Result<string>>;

	updateProfile(userEmail: string, reqBody: any): Promise<Result<string>>;

	updateUserRole(userEmail: string, roleName: string): Promise<Result<IUserDTO>>;

	deleteUser(userEmail: string): Promise<Result<IUserDTO>>;
}
