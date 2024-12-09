import Role from '../../domain/role';

export default interface IRoleRepo {
	createRole(role: Role): Promise<boolean>;

	findAllRoles(): Promise<Role[]>;

	findOneRole(id: string): Promise<Role | null>;

	findOneRoleByName(name: string): Promise<Role | null>;

	updateRole(id: string, role: Role): Promise<boolean>;

	deleteRole(id: string): Promise<boolean>;
}
