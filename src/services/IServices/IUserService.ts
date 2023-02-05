import IUserDTO from '../../dtos/IUserDTO';
import { Result } from '../../core/infrastructure/Result';

export default interface IUserService {
	createUser(dto: any): Promise<Result<IUserDTO>>;

	getAllUsers(): Promise<Result<IUserDTO[]>>;

	getUser(email: string): Promise<Result<IUserDTO>>;

	updateUser(dto: any): Promise<Result<IUserDTO>>;

	toggleUser(email: string): Promise<Result<IUserDTO>>;

	deleteUser(email: string): Promise<Result<IUserDTO>>;
}
