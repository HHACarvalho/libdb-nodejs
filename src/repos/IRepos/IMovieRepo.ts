import { Movie } from '../../domain/movie';

export default interface IMovieRepo {
	exists(id: string): Promise<boolean>;

	createMovie(movie: Movie): Promise<Movie>;

	findOneMovie(id: string): Promise<Movie>;

	findMovies(title: string): Promise<Movie[]>;

	findAllMovies(): Promise<Movie[]>;

	updateMovie(movie: Movie): Promise<Movie>;

	deleteMovie(id: string): Promise<Movie>;
}
