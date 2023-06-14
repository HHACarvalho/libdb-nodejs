import dotenv from "dotenv";

if (dotenv.config().error) {
	throw new Error("Couldn't find .env file");
}

export default {
	// The APIs url prefix
	apiPrefix: '/api',

	// Mongo connection string
	databaseURL: process.env.DATABASE_URL,

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
		role: {
			name: 'roleController',
			path: '../../controllers/roleController',
		},
		movie: {
			name: 'movieController',
			path: '../../controllers/movieController',
		},
	},

	services: {
		user: {
			name: 'userService',
			path: '../../services/userService',
		},
		role: {
			name: 'roleService',
			path: '../../services/roleService',
		},
		movie: {
			name: 'movieService',
			path: '../../services/movieService',
		},
	},

	repos: {
		user: {
			name: 'userRepo',
			path: '../../repos/userRepo',
		},
		role: {
			name: 'roleRepo',
			path: '../../repos/roleRepo',
		},
		movie: {
			name: 'movieRepo',
			path: '../../repos/movieRepo',
		},
	},

	schemas: {
		user: {
			name: 'userSchema',
			path: '../../schemas/userSchema',
		},
		role: {
			name: 'roleSchema',
			path: '../../schemas/roleSchema',
		},
		movie: {
			name: 'movieSchema',
			path: '../../schemas/movieSchema',
		},
	},
};
