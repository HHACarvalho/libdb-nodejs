import Result from '../../core/result';

export default interface IRoleService {
	createRole(reqBody: any): Promise<Result>;

	findAllRoles(): Promise<Result>;

	findOneRole(id: string): Promise<Result>;

	updateRole(id: string, reqBody: any): Promise<Result>;

	deleteRole(id: string): Promise<Result>;
}
