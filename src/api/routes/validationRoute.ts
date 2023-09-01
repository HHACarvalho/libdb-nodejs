import { userValidation } from '../authMiddleware';
import { Permissions } from '../../core/permissions';

import { Router } from 'express';

const validationRoute = Router();

export default (app: Router) => {
	app.use('/validation', validationRoute);

	validationRoute.post('/movie', userValidation([Permissions.manageMovies]), (req, res) => {
		res.status(200).send('Ok');
	});
};
