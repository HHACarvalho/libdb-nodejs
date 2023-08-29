import { Result } from '../../core/result';
import IUserDTO from "../../dtos/IUserDTO";

export default interface IUserService {
	signUp(reqBody: any): Promise<Result<string>>;

	login(reqBody: any): Promise<Result<string>>;

	updateProfile(email: string, reqBody: any): Promise<Result<string>>;

	updateUserRole(email: string, role: string): Promise<Result<IUserDTO>>;

	deleteUser(email: string): Promise<Result<IUserDTO>>;
}
