import { config } from 'dotenv';

config();

export const TYPES = {
	IRoleSchema: Symbol.for('IRoleSchema'),
	IRoleRepo: Symbol.for('IRoleRepo'),
	IRoleService: Symbol.for('IRoleService'),
	IUserSchema: Symbol.for('IUserSchema'),
	IUserRepo: Symbol.for('IUserRepo'),
	IUserService: Symbol.for('IUserService')
};

export default {
	// Port used by the API
	apiPort: 3000,

	// MongoDB's connection string
	databaseURL:
		process.env.ENVIRONMENT === 'PRODUCTION'
			? process.env.DB_CONNECTION_PRODUCTION || ''
			: process.env.DB_CONNECTION_DEVELOPMENT || '',

	// JSON Web Token's expiration time in seconds
	jwtDuration: 30,

	// JSON Web Token's access secret
	jwtAccessSecret: process.env.JWT_SECRET_ACCESS || '',

	// JSON Web Token's refresh secret
	jwtRefreshSecret: process.env.JWT_SECRET_REFRESH || '',

	// Default user role for new users
	defaultRole: 'User'
};
