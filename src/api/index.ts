import movie from './routes/movieRoute';
import user from './routes/userRoute';

import { Router } from 'express';

export default () => {
	const app = Router();

	movie(app);
	user(app);

	return app;
};
