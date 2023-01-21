import employee from './employeeRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	employee(app);

	return app;
};
