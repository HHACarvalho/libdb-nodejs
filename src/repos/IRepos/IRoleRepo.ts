import { Role } from '../../domain/role';

export default interface IRoleRepo {
	createRole(role: Role): Promise<boolean>;

	findAllRoles(): Promise<Role[]>;

	findRoles(roleName: string): Promise<Role[]>;

	findOneRole(roleName: string): Promise<Role | null>;

	updateRole(roleName: string, role: Role): Promise<boolean>;

	deleteRole(roleName: string): Promise<boolean>;
}
