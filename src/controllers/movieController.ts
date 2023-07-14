import config from '../../config';
import { Result } from '../core/result';
import { Utils } from '../core/utils';
import IMovieController from './IControllers/IMovieController';
import IMovieDTO from '../dtos/IMovieDTO';
import IMovieService from '../services/IServices/IMovieService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class MovieController implements IMovieController {
	constructor(
		@Inject(config.services.movie) private serviceInstance: IMovieService,
		@Inject('logger') private logger
	) {}

	public async createMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.createMovie(req.body)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn(Utils.logMessage(false, this.createMovie.name));
				return res.status(400);
			}

			res.status(201);

			this.logger.info(Utils.logMessage(true, this.createMovie.name));
			return res.send('Successfully created movie');
		} catch (e) {
			return next(e);
		}
	}

	public async findOneMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const result = (await this.serviceInstance.findOneMovie(idParameter)) as Result<IMovieDTO>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn(Utils.logMessage(false, this.findOneMovie.name));
				return res.status(404);
			}

			res.json(result.value);

			this.logger.info(Utils.logMessage(true, this.findOneMovie.name));
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async findMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const titleParameter = req.query.title as string;

			const result = (await this.serviceInstance.findMovies(titleParameter)) as Result<IMovieDTO[]>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn(Utils.logMessage(false, this.findMovies.name));
				return res.status(404);
			}

			res.json(result.value);

			this.logger.info(Utils.logMessage(true, this.findMovies.name));
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async findAllMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const result = (await this.serviceInstance.findAllMovies()) as Result<IMovieDTO[]>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn(Utils.logMessage(false, this.findAllMovies.name));
				return res.status(404);
			}

			res.json(result.value);

			this.logger.info(Utils.logMessage(true, this.findAllMovies.name));
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async updateMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const result = (await this.serviceInstance.updateMovie(idParameter, req.body)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn(Utils.logMessage(false, this.updateMovie.name));
				return res.status(404);
			}

			res.status(200);

			this.logger.info(Utils.logMessage(true, this.updateMovie.name));
			return res.send('Successfully updated movie');
		} catch (e) {
			return next(e);
		}
	}

	public async deleteMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const result = (await this.serviceInstance.deleteMovie(idParameter)) as Result<any>;
			if (!result.isSuccess) {
				res.json(result.error);

				this.logger.warn(Utils.logMessage(false, this.deleteMovie.name));
				return res.status(404);
			}

			res.status(200);

			this.logger.info(Utils.logMessage(true, this.deleteMovie.name));
			return res.send('Successfully deleted movie');
		} catch (e) {
			return next(e);
		}
	}
}
