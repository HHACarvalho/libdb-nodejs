import { Result } from '../../core/result';
import IRoleDTO from '../../dtos/IRoleDTO';

export default interface IRoleService {
	createRole(reqBody: any): Promise<Result<IRoleDTO>>;

	findAllRoles(): Promise<Result<IRoleDTO[]>>;

	updateRole(roleName: string, reqBody: any): Promise<Result<IRoleDTO>>;

	deleteRole(roleName: string): Promise<Result<IRoleDTO>>;
}
