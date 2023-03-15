import { Result } from '../../core/infrastructure/Result';
import IMovieDTO from '../../dtos/IMovieDTO';

export default interface IMovieService {
	createMovie(dto: any): Promise<Result<IMovieDTO>>;

	getMovie(id: string): Promise<Result<IMovieDTO>>;

	getAllMovies(): Promise<Result<IMovieDTO[]>>;

	updateMovie(dto: any): Promise<Result<IMovieDTO>>;

	deleteMovie(id: string): Promise<Result<IMovieDTO>>;

	toggleMovie(id: string): Promise<Result<IMovieDTO>>;
}
