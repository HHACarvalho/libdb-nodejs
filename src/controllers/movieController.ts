import config from '../../config';
import { Result } from '../core/infrastructure/Result';
import IMovieController from './IControllers/IMovieController';
import IMovieDTO from '../dtos/IMovieDTO';
import IMovieService from '../services/IServices/IMovieService';

import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';

@Service()
export default class MovieController implements IMovieController {
	constructor(@Inject(config.services.movie.name) private serviceInstance: IMovieService) {}

	public async createMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.createMovie(req.body)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async findOneMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const objOrError = (await this.serviceInstance.findOneMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async findMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const titleParameter = req.query.title as string;

			const objOrError = (await this.serviceInstance.findMovies(titleParameter)) as Result<IMovieDTO[]>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async findAllMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.findAllMovies()) as Result<IMovieDTO[]>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async updateMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.updateMovie(req.body)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(201).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const objOrError = (await this.serviceInstance.deleteMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async toggleMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;

			const objOrError = (await this.serviceInstance.toggleMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}
}
