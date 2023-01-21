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
		employee: {
			name: 'employeeController',
			path: '../../controllers/employeeController',
		},
	},

	services: {
		employee: {
			name: 'employeeService',
			path: '../../services/employeeService',
		},
	},

	repos: {
		employee: {
			name: 'employeeRepo',
			path: '../../repos/employeeRepo',
		},
	},

	schemas: {
		employee: {
			name: 'employeeSchema',
			path: '../../schemas/employeeSchema',
		},
	},
};
