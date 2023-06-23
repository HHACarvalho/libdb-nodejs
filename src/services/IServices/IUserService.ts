import { Result } from '../../core/Result';

export default interface IUserService {
	signUp(dto: any): Promise<Result<any>>;

	login(dto: any): Promise<Result<any>>;

	updateUser(dto: any): Promise<Result<any>>;

	deleteUser(email: string): Promise<Result<any>>;
}
