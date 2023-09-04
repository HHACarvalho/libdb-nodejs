import { Role } from '../../domain/role';

export default interface IRoleRepo {
	createRole(role: Role): Promise<void>;

	findRole(roleName: string): Promise<Role>;

	findAllRoles(): Promise<Role[]>;

	updateRole(role: Role): Promise<void>;

	deleteRole(roleName: string): Promise<Role>;
}
