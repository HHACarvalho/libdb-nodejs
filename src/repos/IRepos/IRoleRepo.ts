import { Role } from '../../domain/role/role';

export default interface IRoleRepo {
	exists(name: string): Promise<boolean>;

	createRole(role: Role): Promise<Role>;

	getRole(name: string): Promise<Role>;

	getAllRoles(): Promise<Role[]>;

	updateRole(role: Role): Promise<Role>;

	deleteRole(name: string): Promise<Role>;
}
