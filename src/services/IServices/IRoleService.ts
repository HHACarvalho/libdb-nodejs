import { Result } from '../../core/infrastructure/Result';
import IRoleDTO from '../../dtos/IRoleDTO';

export default interface IRoleService {
	createRole(dto: any): Promise<Result<IRoleDTO>>;

	findAllRoles(): Promise<Result<IRoleDTO[]>>;

	updateRole(dto: any): Promise<Result<IRoleDTO>>;

	deleteRole(name: string): Promise<Result<IRoleDTO>>;
}
