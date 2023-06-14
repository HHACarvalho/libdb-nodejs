import dotenv from 'dotenv';

if (dotenv.config().error) {
	throw new Error("Couldn't find .env file");
}

export default {
	// Port used by the API
	apiPort: 3000,

	// URL prefix used to access the API
	apiPrefix: '/api',

	// MongoDB's connection string
	databaseURL: process.env.DATABASE_URL,

	// Affects logging procedure
	environment: 'development',

	// Log message if it's type is equal to info, warn or error
	logLevel: 'info',

	controllers: {
		movie: 'movieController',
		role: 'roleController',
		user: 'userController',
	},

	services: {
		movie: 'movieService',
		role: 'roleService',
		user: 'userService',
	},

	repos: {
		movie: 'movieRepo',
		role: 'roleRepo',
		user: 'userRepo',
	},

	schemas: {
		movie: 'movieSchema',
		role: 'roleSchema',
		user: 'userSchema',
	},
};
