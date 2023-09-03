export interface IUserDTO {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
}

export interface IUserLiteDTO {
	firstName: string;
	lastName: string;
	role: string;
}

export interface IUserPersistence {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: string;
}
