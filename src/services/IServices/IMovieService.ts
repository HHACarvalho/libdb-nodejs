import { Result } from '../../core/Result';
import IMovieDTO from '../../dtos/IMovieDTO';

export default interface IMovieService {
	createMovie(dto: any): Promise<Result<IMovieDTO>>;

	findOneMovie(id: string): Promise<Result<IMovieDTO>>;

	findMovies(title: string): Promise<Result<IMovieDTO[]>>;

	findAllMovies(): Promise<Result<IMovieDTO[]>>;

	updateMovie(dto: any): Promise<Result<IMovieDTO>>;

	deleteMovie(id: string): Promise<Result<IMovieDTO>>;

	toggleMovie(id: string): Promise<Result<IMovieDTO>>;
}
