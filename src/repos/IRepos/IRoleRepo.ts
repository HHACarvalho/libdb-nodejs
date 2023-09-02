import { Role } from '../../domain/role';

export default interface IRoleRepo {
	createRole(role: Role): Promise<Role>;

	findRole(roleName: string): Promise<Role>;

	findAllRoles(): Promise<Role[]>;

	updateRole(role: Role): Promise<Role>;

	deleteRole(roleName: string): Promise<Role>;
}
