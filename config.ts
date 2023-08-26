import { config } from 'dotenv';

config();

export default {
	// Port used by the API
	apiPort: parseInt(process.env.API_PORT),

	// MongoDB's connection string
	databaseURL: process.env.DATABASE_URL,

	// JSON Web Token's expiration time in seconds
	jwtDuration: parseInt(process.env.JWT_DURATION),

	// JSON Web Token's access secret
	jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

	// JSON Web Token's refresh secret
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

	// Affects logging procedure
	environment: 'development',

	controllers: {
		role: 'roleController',
		user: 'userController',
	},

	services: {
		role: 'roleService',
		user: 'userService',
	},

	repos: {
		role: 'roleRepo',
		user: 'userRepo',
	},

	schemas: {
		role: 'roleSchema',
		user: 'userSchema',
	},
};
