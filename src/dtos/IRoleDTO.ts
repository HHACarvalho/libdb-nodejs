export interface IRoleDTO {
	name: string;
	permissions: any;
}

export interface IRolePersistence {
	_id: string;
	name: string;
	permissions: string[];
}
