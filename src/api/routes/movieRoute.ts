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
			id: Joi.string().min(2).max(36),
			title: Joi.string().min(2).max(96).required(),
			director: Joi.string().min(2).max(32).required(),
			releaseYear: Joi.number().integer().min(1888).required(),
		}),
	});

	const schemaIdQuery = celebrate({
		[Segments.QUERY]: Joi.object().keys({
			id: Joi.string().min(2).max(36).required(),
		}),
	});

	const schemaTitleQuery = celebrate({
		[Segments.QUERY]: Joi.object().keys({
			title: Joi.string().min(2).max(96).required(),
		}),
	});

	movieRoute.post('', schema, (req, res, next) => controller.createMovie(req, res, next));

	movieRoute.get('', schemaIdQuery, (req, res, next) => controller.findOneMovie(req, res, next));

	movieRoute.get('/search', schemaTitleQuery, (req, res, next) => controller.findMovies(req, res, next));

	movieRoute.get('/all', (req, res, next) => controller.findAllMovies(req, res, next));

	movieRoute.put('', schema, (req, res, next) => controller.updateMovie(req, res, next));

	movieRoute.delete('', schemaIdQuery, (req, res, next) => controller.deleteMovie(req, res, next));

	movieRoute.patch('', schemaIdQuery, (req, res, next) => controller.toggleMovie(req, res, next));
};
