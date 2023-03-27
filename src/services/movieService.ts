import config from '../../config';
import { EntityID } from '../core/domain/EntityID';
import { Movie } from '../domain/movie/movie';
import { MovieTitle } from '../domain/movie/movieTitle';
import { MovieDirector } from '../domain/movie/movieDirector';
import { MovieReleaseYear } from '../domain/movie/movieReleaseYear';
import { MovieMapper } from '../mappers/movieMapper';
import { Result } from '../core/infrastructure/Result';
import IMovieDTO from '../dtos/IMovieDTO';
import IMovieRepo from '../repos/IRepos/IMovieRepo';
import IMovieService from './IServices/IMovieService';

import { Inject, Service } from 'typedi';

@Service()
export default class MovieService implements IMovieService {
	constructor(@Inject(config.repos.movie.name) private repoInstance: IMovieRepo) {}

	public async createMovie(dto: any): Promise<Result<IMovieDTO>> {
		try {
			const obj = Movie.create(
				{
					title: MovieTitle.create(dto.title).value,
					director: MovieDirector.create(dto.director).value,
					releaseYear: MovieReleaseYear.create(dto.releaseYear).value,
					hidden: false,
				},
				new EntityID(dto.id)
			);
			if (!obj.isSuccess) {
				return Result.fail<IMovieDTO>(obj.error);
			}

			const result = await this.repoInstance.createMovie(obj.value);
			return Result.ok<IMovieDTO>(MovieMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async findOneMovie(id: string): Promise<Result<IMovieDTO>> {
		try {
			const obj = await this.repoInstance.findOneMovie(id);
			if (obj == null) {
				return Result.fail<IMovieDTO>('No movie with id=' + id + ' was found');
			}

			return Result.ok<IMovieDTO>(MovieMapper.toDTO(obj));
		} catch (e) {
			throw e;
		}
	}

	public async findMovies(title: string): Promise<Result<IMovieDTO[]>> {
		try {
			const list = await this.repoInstance.findMovies(title);
			if (list == null) {
				return Result.fail<IMovieDTO[]>('No movies with title=' + title + ' were found');
			}

			return Result.ok<IMovieDTO[]>(list.map((e) => MovieMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async findAllMovies(): Promise<Result<IMovieDTO[]>> {
		try {
			const list = await this.repoInstance.findAllMovies();
			if (list == null) {
				return Result.fail<IMovieDTO[]>('There are no movies');
			}

			return Result.ok<IMovieDTO[]>(list.map((e) => MovieMapper.toDTO(e)));
		} catch (e) {
			throw e;
		}
	}

	public async updateMovie(dto: any): Promise<Result<IMovieDTO>> {
		try {
			const obj = await this.repoInstance.findOneMovie(dto.id);
			if (obj == null) {
				return Result.fail<IMovieDTO>('No movie with id=' + dto.id + ' was found');
			}

			if (dto.title) obj.title = MovieTitle.create(dto.title).value;
			if (dto.director) obj.director = MovieDirector.create(dto.director).value;
			if (dto.releaseYear) obj.releaseYear = MovieReleaseYear.create(dto.releaseYear).value;

			const result = await this.repoInstance.updateMovie(obj);
			return Result.ok<IMovieDTO>(MovieMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async deleteMovie(id: string): Promise<Result<IMovieDTO>> {
		try {
			const movieExists = await this.repoInstance.exists(id);

			if (!movieExists) {
				return Result.fail<IMovieDTO>('No movie with id=' + id + ' was found');
			}

			const result = await this.repoInstance.deleteMovie(id);
			return Result.ok<IMovieDTO>(MovieMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}

	public async toggleMovie(id: string): Promise<Result<IMovieDTO>> {
		try {
			const obj = await this.repoInstance.findOneMovie(id);
			if (obj == null) {
				return Result.fail<IMovieDTO>('No movie with id=' + id + ' was found');
			}

			obj.hidden = !obj.hidden;

			const result = await this.repoInstance.updateMovie(obj);
			return Result.ok<IMovieDTO>(MovieMapper.toDTO(result));
		} catch (e) {
			throw e;
		}
	}
}
