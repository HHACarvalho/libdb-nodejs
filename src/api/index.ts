import validationRoute from './routes/validationRoute';
import role from './routes/roleRoute';
import user from './routes/userRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	validationRoute(app);
	role(app);
	user(app);

	return app;
};
