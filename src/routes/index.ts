import user from './userRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	user(app);

	return app;
};
