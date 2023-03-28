import config from '../../config';
import { Movie } from '../domain/movie';
import { MovieMapper } from '../mappers/movieMapper';
import IMoviePersistence from '../dtos/IMoviePersistence';
import IMovieRepo from './IRepos/IMovieRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class MovieRepo implements IMovieRepo {
	constructor(@Inject(config.schemas.movie.name) private schema: Model<IMoviePersistence & Document>) {}

	public async exists(id: string): Promise<boolean> {
		const document = await this.schema.findOne({ _id: id });
		return !!document === true;
	}

	public async createMovie(movie: Movie): Promise<Movie> {
		try {
			const persistence = MovieMapper.toPersistence(movie);
			const document = await this.schema.create(persistence);
			return MovieMapper.toDomain(document);
		} catch (e) {
			throw e;
		}
	}

	public async findOneMovie(id: string): Promise<Movie> {
		const document = await this.schema.findOne({ _id: id });
		if (document == null) {
			return null;
		}

		return MovieMapper.toDomain(document);
	}

	public async findMovies(title: string): Promise<Movie[]> {
		const titleQuery = new RegExp(`${title}`, 'i');

		const documents = await this.schema.find({ title: titleQuery });
		if (documents == null) {
			return null;
		}

		return documents.map((e) => MovieMapper.toDomain(e));
	}

	public async findAllMovies(): Promise<Movie[]> {
		const documents = await this.schema.find();
		if (documents == null) {
			return null;
		}

		return documents.map((e) => MovieMapper.toDomain(e));
	}

	public async updateMovie(movie: Movie): Promise<Movie> {
		try {
			const document = await this.schema.findOne({ _id: movie.id.toValue() });

			document.title = movie.title;
			document.director = movie.director;
			document.releaseYear = movie.releaseYear;
			document.hidden = movie.hidden;

			return MovieMapper.toDomain(await document.save());
		} catch (e) {
			throw e;
		}
	}

	public async deleteMovie(id: string): Promise<Movie> {
		const document = await this.schema.findOne({ _id: id });
		if (document == null) {
			return null;
		}

		return MovieMapper.toDomain(await document.remove());
	}
}
