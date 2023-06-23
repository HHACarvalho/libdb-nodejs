import config from '../../config';
import { Result } from '../core/Result';
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
			const objOrError = (await this.serviceInstance.createMovie(req.body)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received createMovie() request -> fail');
				return res.status(400);
			}

			this.logger.info('Received createMovie() request -> success');
			return res.status(201);
		} catch (e) {
			return next(e);
		}
	}

	public async findOneMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const objOrError = (await this.serviceInstance.findOneMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received findOneMovie() request -> fail');
				return res.status(404);
			}

			res.json(objOrError.value);

			this.logger.info('Received findOneMovie() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async findMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const titleParameter = req.query.title as string;

			const objOrError = (await this.serviceInstance.findMovies(titleParameter)) as Result<IMovieDTO[]>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received findMovies() request -> fail');
				return res.status(404);
			}

			res.json(objOrError.value);

			this.logger.info('Received findMovies() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async findAllMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.findAllMovies()) as Result<IMovieDTO[]>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received findAllMovies() request -> fail');
				return res.status(404);
			}

			res.json(objOrError.value);

			this.logger.info('Received findAllMovies() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async updateMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateMovie(req.body)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received updateMovie() request -> fail');
				return res.status(404);
			}

			this.logger.info('Received updateMovie() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const objOrError = (await this.serviceInstance.deleteMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				res.json(objOrError.error);

				this.logger.warn('Received deleteMovie() request -> fail');
				return res.status(404);
			}

			this.logger.info('Received deleteMovie() request -> success');
			return res.status(200);
		} catch (e) {
			return next(e);
		}
	}

	public async toggleMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const objOrError = (await this.serviceInstance.toggleMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				res.status(400);
				res.json(objOrError.error);
				return res;
			}

			res.status(200);
			res.json(objOrError.value);
			return res;
		} catch (e) {
			return next(e);
		}
	}
}
