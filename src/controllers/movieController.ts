import config from '../../config';
import IMovieController from './IControllers/IMovieController';
import IMovieDTO from '../dtos/IMovieDTO';
import IMovieService from '../services/IServices/IMovieService';
import { Result } from '../core/infrastructure/Result';

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

	public async getMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;
			if (idParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.getMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(404).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async getAllMovies(req: Request, res: Response, next: NextFunction) {
		try {
			const objOrError = (await this.serviceInstance.getAllMovies()) as Result<IMovieDTO[]>;
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

	public async toggleMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;
			if (idParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.toggleMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}

	public async deleteMovie(req: Request, res: Response, next: NextFunction) {
		try {
			const idParameter = req.query.id as string;
			if (idParameter == null) {
				return res.status(404).json('Please specify an ID in the parameters');
			}

			const objOrError = (await this.serviceInstance.deleteMovie(idParameter)) as Result<IMovieDTO>;
			if (!objOrError.isSuccess) {
				return res.status(400).json(objOrError.error);
			}

			return res.status(200).json(objOrError.value);
		} catch (e) {
			return next(e);
		}
	}
}
