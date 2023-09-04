import { Role } from '../../domain/role';

export default interface IRoleRepo {
	createRole(role: Role): Promise<void>;

	findAllRoles(): Promise<Role[]>;

	findRole(roleName: string): Promise<Role>;

	updateRole(role: Role): Promise<void>;

	deleteRole(roleName: string): Promise<Role>;
}
