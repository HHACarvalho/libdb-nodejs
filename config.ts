import { config } from 'dotenv';

config();

export default {
	// Port used by the API
	apiPort: 3000,

	// MongoDB's connection string
	databaseURL:
		process.env.ENVIRONMENT === 'PRODUCTION'
			? process.env.DB_CONNECTION_PRODUCTION
			: process.env.DB_CONNECTION_DEVELOPMENT,

	// JSON Web Token's expiration time in seconds
	jwtDuration: 30,

	// JSON Web Token's access secret
	jwtAccessSecret: process.env.JWT_SECRET_ACCESS,

	// JSON Web Token's refresh secret
	jwtRefreshSecret: process.env.JWT_SECRET_REFRESH,

	// Default user role for new users
	defaultRole: 'User',

	controllers: {
		role: 'roleController',
		user: 'userController'
	},

	services: {
		role: 'roleService',
		user: 'userService'
	},

	repos: {
		role: 'roleRepo',
		user: 'userRepo'
	},

	schemas: {
		role: 'roleSchema',
		user: 'userSchema'
	}
};
