import { Movie } from '../../domain/movie/movie';

export default interface IMovieRepo {
	exists(id: string): Promise<boolean>;

	createMovie(movie: Movie): Promise<Movie>;

	getMovie(id: string): Promise<Movie>;

	getAllMovies(): Promise<Movie[]>;

	updateMovie(movie: Movie): Promise<Movie>;

	deleteMovie(id: string): Promise<Movie>;
}
