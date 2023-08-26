import role from './routes/roleRoute';
import user from './routes/userRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	role(app);
	user(app);

	return app;
};
