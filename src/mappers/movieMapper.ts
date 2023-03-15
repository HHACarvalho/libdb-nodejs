import Logger from '../core/loaders/loggerLoader';
import { Movie } from '../domain/movie/movie';
import { MovieTitle } from '../domain/movie/movieTitle';
import { MovieDirector } from '../domain/movie/movieDirector';
import { MovieReleaseYear } from '../domain/movie/movieReleaseYear';
import { EntityID } from '../core/domain/EntityID';
import IMovieDTO from '../dtos/IMovieDTO';
import IMoviePersistence from '../dtos/IMoviePersistence';

import { Document, Model } from 'mongoose';

export class MovieMapper {
	public static toDomain(schema: any | Model<IMoviePersistence & Document>): Movie {
		const objOrError = Movie.create(
			{
				title: MovieTitle.create(schema.title).value,
				director: MovieDirector.create(schema.director).value,
				releaseYear: MovieReleaseYear.create(schema.releaseYear).value,
				hidden: schema.hidden,
			},
			new EntityID(schema.id)
		);

		if (!objOrError.isSuccess) {
			Logger.error(objOrError.error);
		}

		return objOrError.isSuccess ? objOrError.value : null;
	}

	public static toDTO(movie: Movie): IMovieDTO {
		return {
			title: movie.title.value,
			director: movie.director.value,
			releaseYear: movie.releaseYear.value,
			hidden: movie.hidden,
		} as IMovieDTO;
	}

	public static toPersistence(movie: Movie): IMoviePersistence {
		return {
			_id: movie.id.toValue(),
			title: movie.title.value,
			director: movie.director.value,
			releaseYear: movie.releaseYear.value,
			hidden: movie.hidden,
		} as IMoviePersistence;
	}
}
