import config from '../../config';
import { Movie } from '../domain/movie';
import { MovieMapper } from '../mappers/movieMapper';
import { Result } from '../core/result';
import IMovieDTO from '../dtos/IMovieDTO';
import IMovieRepo from '../repos/IRepos/IMovieRepo';
import IMovieService from './IServices/IMovieService';

import { Inject, Service } from 'typedi';

@Service()
export default class MovieService implements IMovieService {
	constructor(@Inject(config.repos.movie) private repoInstance: IMovieRepo) {}

	public async createMovie(reqBody: any): Promise<Result<any>> {
		try {
			const movie = Movie.create({
				title: reqBody.title,
				director: reqBody.director,
				releaseYear: reqBody.releaseYear,
				hidden: false,
			});

			await this.repoInstance.createMovie(movie);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	public async findOneMovie(id: string): Promise<Result<IMovieDTO>> {
		try {
			const movie = await this.repoInstance.findOneMovie(id);
			if (movie == null) {
				return Result.fail<IMovieDTO>('No movie with the id "' + id + '" was found');
			}

			return Result.ok<IMovieDTO>(MovieMapper.toDTO(movie));
		} catch (e) {
			throw e;
		}
	}

	public async findMovies(title: string): Promise<Result<IMovieDTO[]>> {
		try {
			const movieList = await this.repoInstance.findMovies(title);
			if (movieList.length === 0) {
				return Result.fail<IMovieDTO[]>('No movies with "' + title + '" in the title were found');
			}

			return Result.ok<IMovieDTO[]>(movieList.map((e) => MovieMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async findAllMovies(): Promise<Result<IMovieDTO[]>> {
		try {
			const movieList = await this.repoInstance.findAllMovies();
			if (movieList.length === 0) {
				return Result.fail<IMovieDTO[]>('There are no movies');
			}

			return Result.ok<IMovieDTO[]>(movieList.map((e) => MovieMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async updateMovie(id: string, reqBody: any): Promise<Result<any>> {
		try {
			const movie = await this.repoInstance.findOneMovie(id);
			if (movie == null) {
				return Result.fail<any>('No movie with the id "' + id + '" was found');
			}

			movie.title = reqBody.title;
			movie.director = reqBody.director;
			movie.releaseYear = reqBody.releaseYear;

			await this.repoInstance.updateMovie(movie);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}

	public async deleteMovie(id: string): Promise<Result<any>> {
		try {
			const movieExists = await this.repoInstance.exists(id);
			if (!movieExists) {
				return Result.fail<any>('No movie with the id "' + id + '" was found');
			}

			await this.repoInstance.deleteMovie(id);
			return Result.ok<any>();
		} catch (e) {
			throw e;
		}
	}
}
