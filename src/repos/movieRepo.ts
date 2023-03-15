import config from '../../config';
import { Movie } from '../domain/movie/movie';
import { MovieMapper } from '../mappers/movieMapper';
import IMoviePersistence from '../dtos/IMoviePersistence';
import IMovieRepo from './IRepos/IMovieRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class MovieRepo implements IMovieRepo {
	constructor(@Inject(config.schemas.movie.name) private schema: Model<IMoviePersistence & Document>) {}

	public async exists(id: string): Promise<boolean> {
		const document = await this.schema.findOne({ id: id });
		return !!document === true;
	}

	public async createMovie(movie: Movie): Promise<Movie> {
		try {
			const persistence = MovieMapper.toPersistence(movie);
			const persisted = await this.schema.create(persistence);
			return MovieMapper.toDomain(persisted);
		} catch (e) {
			throw e;
		}
	}

	public async getMovie(id: string): Promise<Movie> {
		const document = await this.schema.findOne({ id: id });
		if (document == null) {
			return null;
		}

		return MovieMapper.toDomain(document);
	}

	public async getAllMovies(): Promise<Movie[]> {
		const documents = await this.schema.find();
		if (documents == null) {
			return null;
		}

		return documents.map((e) => MovieMapper.toDomain(e));
	}

	public async updateMovie(movie: Movie): Promise<Movie> {
		try {
			const document = await this.schema.findOne({ id: movie.id.toValue() });

			document.title = movie.title.value;
			document.director = movie.director.value;
			document.releaseYear = movie.releaseYear.value;
			document.hidden = movie.hidden;

			const persisted = await document.save();
			return MovieMapper.toDomain(persisted);
		} catch (e) {
			throw e;
		}
	}

	public async deleteMovie(id: string): Promise<Movie> {
		const document = await this.schema.findOne({ id: id });
		if (document == null) {
			return null;
		}

		return MovieMapper.toDomain(await document.remove());
	}
}
