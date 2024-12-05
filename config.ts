import { config } from 'dotenv';

config();
// API configuration
export const CONFIG = {
	// Port used by the API
	API_PORT: 3000,

	// MongoDB's connection string
	DB_URL:
		process.env.ENVIRONMENT === 'PRODUCTION'
			? process.env.DB_CONNECTION_PRODUCTION || ''
			: process.env.DB_CONNECTION_DEVELOPMENT || '',

	// JSON Web Token's expiration time in seconds
	JWT_DURATION: 30,

	// JSON Web Token's access secret
	JWT_ACCESS_SECRET: process.env.JWT_SECRET_ACCESS || '',

	// JSON Web Token's refresh secret
	JWT_REFRESH_SECRET: process.env.JWT_SECRET_REFRESH || '',

	// Default user role for new users
	DEFAULT_ROLE: 'User',

// Types for dependency injection
export const TYPES = {
	IRoleSchema: Symbol.for('IRoleSchema'),
	IRoleRepo: Symbol.for('IRoleRepo'),
	IRoleService: Symbol.for('IRoleService'),
	IUserSchema: Symbol.for('IUserSchema'),
	IUserRepo: Symbol.for('IUserRepo'),
	IUserService: Symbol.for('IUserService')
};
