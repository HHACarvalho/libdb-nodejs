import movie from './routes/movieRoute';
import role from './routes/roleRoute';
import user from './routes/userRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	movie(app);
	role(app);
	user(app);

	return app;
};
