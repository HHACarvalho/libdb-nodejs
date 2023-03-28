import config from '../../config';
import { EntityID } from '../core/domain/EntityID';
import { Movie } from '../domain/movie';
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
			if (dto.id) {
				const movieExists = await this.repoInstance.exists(dto.id);
				if (movieExists) {
					return Result.fail<IMovieDTO>('Movie with id=' + dto.id + ' already exists');
				}
			}

			const obj = Movie.create(
				{
					title: dto.title,
					director: dto.director,
					releaseYear: dto.releaseYear,
					hidden: false,
				},
				new EntityID(dto.id)
			);

			const result = await this.repoInstance.createMovie(obj);
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

			if (dto.title) obj.title = dto.title;
			if (dto.director) obj.director = dto.director;
			if (dto.releaseYear) obj.releaseYear = dto.releaseYear;

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
