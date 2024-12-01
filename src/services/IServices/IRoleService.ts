import Result from '../../core/result';

export default interface IRoleService {
	createRole(reqBody: any): Promise<Result>;

	findAllRoles(): Promise<Result>;

	findRoles(roleName: string): Promise<Result>;

	findOneRole(roleName: string): Promise<Result>;

	updateRole(roleName: string, reqBody: any): Promise<Result>;

	deleteRole(roleName: string): Promise<Result>;
}
