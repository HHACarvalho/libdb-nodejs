import dotenv from "dotenv";

if (!dotenv.config()) {
	throw new Error("Couldn't find .env file.");
}

export default {
	// The APIs url prefix
	apiPrefix: '/api',

	// Mongo connection string
	databaseURL: process.env.DATABASE_URL || '',

	// Only affects logging procedure
	environment: 'development',

	// Only log if level is either info, warn or error
	logLevel: 'info',

	// Port to be used by the API
	port: 3000,

	controllers: {
		user: {
			name: 'userController',
			path: '../../controllers/userController',
		},
	},

	services: {
		user: {
			name: 'userService',
			path: '../../services/userService',
		},
	},

	repos: {
		user: {
			name: 'userRepo',
			path: '../../repos/userRepo',
		},
	},

	schemas: {
		user: {
			name: 'userSchema',
			path: '../../schemas/userSchema',
		},
	},
};
