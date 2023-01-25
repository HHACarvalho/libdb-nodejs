import user from './routes/userRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	user(app);

	return app;
};
