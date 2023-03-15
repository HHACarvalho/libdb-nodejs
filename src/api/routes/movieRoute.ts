import config from '../../../config';
import IMovieController from '../../controllers/IControllers/IMovieController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const movieRoute = Router();

export default (app: Router) => {
	app.use('/movie', movieRoute);

	const controller = Container.get(config.controllers.movie.name) as IMovieController;

	const schema = celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().min(2).max(96).required(),
			director: Joi.string().min(2).max(32).required(),
			releaseYear: Joi.number().integer().min(1888).required(),
		}),
	});

	movieRoute.post('', schema, (req, res, next) => controller.createMovie(req, res, next));

	movieRoute.get('', (req, res, next) => controller.getMovie(req, res, next));

	movieRoute.get('/all', (req, res, next) => controller.getAllMovies(req, res, next));

	movieRoute.put('', schema, (req, res, next) => controller.updateMovie(req, res, next));

	movieRoute.delete('', (req, res, next) => controller.deleteMovie(req, res, next));

	movieRoute.patch('', (req, res, next) => controller.toggleMovie(req, res, next));
};
