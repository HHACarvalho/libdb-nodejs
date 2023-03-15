import { Result } from '../../core/infrastructure/Result';
import IUserDTO from '../../dtos/IUserDTO';

export default interface IUserService {
	createUser(dto: any): Promise<Result<IUserDTO>>;

	getUser(email: string): Promise<Result<IUserDTO>>;

	getAllUsers(): Promise<Result<IUserDTO[]>>;

	updateUser(dto: any): Promise<Result<IUserDTO>>;

	deleteUser(email: string): Promise<Result<IUserDTO>>;
}
