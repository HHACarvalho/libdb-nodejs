import { IRoleDTO } from '../../dtos/IRoleDTO';
import { Result } from '../../core/result';

export default interface IRoleService {
	createRole(reqBody: any): Promise<Result<IRoleDTO>>;

	findAllRoles(): Promise<Result<IRoleDTO[]>>;

	findRoles(roleName: string): Promise<Result<IRoleDTO[]>>;

	findOneRole(roleName: string): Promise<Result<IRoleDTO>>;

	updateRole(roleName: string, reqBody: any): Promise<Result<IRoleDTO>>;

	deleteRole(roleName: string): Promise<Result<IRoleDTO>>;
}
