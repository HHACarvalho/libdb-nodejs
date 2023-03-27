import { Role } from '../../domain/role/role';

export default interface IRoleRepo {
	exists(name: string): Promise<boolean>;

	createRole(role: Role): Promise<Role>;

	findRole(name: string): Promise<Role>;

	findAllRoles(): Promise<Role[]>;

	updateRole(role: Role): Promise<Role>;

	deleteRole(name: string): Promise<Role>;
}
