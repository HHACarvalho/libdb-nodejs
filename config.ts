import dotenv from 'dotenv';

dotenv.config();

export default {
	// Port used by the API
	apiPort: 3000,

	// URL prefix used to access the API
	apiPrefix: '/api',

	// MongoDB's connection string
	databaseURL: process.env.DATABASE_URL,

	// JSON Web Token's expiration time in seconds
	jwtDuration: process.env.JWT_DURATION,

	// JSON Web Token's access secret
	jwtAccessSecret: process.env.JWT_ACCESS_SECRET,

	// JSON Web Token's refresh secret
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,

	// Affects logging procedure
	environment: 'development',

	// Log message if it's type is equal to info, warn or error
	logLevel: 'info',

	controllers: {
		movie: 'movieController',
		user: 'userController',
	},

	services: {
		movie: 'movieService',
		user: 'userService',
	},

	repos: {
		movie: 'movieRepo',
		user: 'userRepo',
	},

	schemas: {
		movie: 'movieSchema',
		user: 'userSchema',
	},
};
