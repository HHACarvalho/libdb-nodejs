import { Role } from '../../domain/role';

export default interface IRoleRepo {
	createRole(role: Role): Promise<Role>;

	findRole(name: string): Promise<Role>;

	findAllRoles(): Promise<Role[]>;

	updateRole(role: Role): Promise<Role>;

	deleteRole(name: string): Promise<Role>;
}
