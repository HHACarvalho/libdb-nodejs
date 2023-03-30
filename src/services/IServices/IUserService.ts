import { Result } from '../../core/Result';
import IUserDTO from '../../dtos/IUserDTO';

export default interface IUserService {
	signUp(dto: any): Promise<Result<IUserDTO>>;

	login(dto: any): Promise<Result<IUserDTO>>;

	updateUser(dto: any): Promise<Result<IUserDTO>>;

	deleteUser(email: string): Promise<Result<IUserDTO>>;
}
