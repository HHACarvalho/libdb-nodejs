import config from '../../../config';
import IMovieController from '../../controllers/IControllers/IMovieController';

import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';

const movieRoute = Router();

export default (app: Router) => {
	app.use('/movie', movieRoute);

	const controller = Container.get(config.controllers.movie) as IMovieController;

	const fullBodySchema = celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().min(2).max(96).required(),
			director: Joi.string().min(2).max(32).required(),
			releaseYear: Joi.number().integer().min(1888).required(),
		}),
	});

	movieRoute.post('', fullBodySchema, (req, res, next) => controller.createMovie(req, res, next));

	movieRoute.get('', (req, res, next) => controller.findOneMovie(req, res, next));

	movieRoute.get('/search', (req, res, next) => controller.findMovies(req, res, next));

	movieRoute.get('/all', (req, res, next) => controller.findAllMovies(req, res, next));

	movieRoute.put('', fullBodySchema, (req, res, next) => controller.updateMovie(req, res, next));

	movieRoute.delete('', (req, res, next) => controller.deleteMovie(req, res, next));
};
