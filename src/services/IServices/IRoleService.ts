import { Result } from '../../core/Result';
import IRoleDTO from '../../dtos/IRoleDTO';

export default interface IRoleService {
	createRole(dto: any): Promise<Result<any>>;

	findAllRoles(): Promise<Result<IRoleDTO[]>>;

	updateRole(dto: any): Promise<Result<any>>;

	deleteRole(name: string): Promise<Result<any>>;
}
