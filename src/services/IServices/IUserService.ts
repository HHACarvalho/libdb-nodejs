import { IUserDTO, IUserLiteDTO } from '../../dtos/IUserDTO';
import { Result } from '../../core/result';

export default interface IUserService {
	signUp(reqBody: any): Promise<Result<string>>;

	login(reqBody: any): Promise<Result<string>>;

	findAllUsers(): Promise<Result<IUserLiteDTO[]>>;

	findUser(userId: string): Promise<Result<IUserLiteDTO>>;

	updateProfile(userEmail: string, reqBody: any): Promise<Result<string>>;

	updateUserRole(userId: string, roleName: string): Promise<Result<IUserDTO>>;

	deleteUser(userEmail: string): Promise<Result<IUserDTO>>;
}
