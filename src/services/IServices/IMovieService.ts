import { Result } from '../../core/Result';
import IMovieDTO from '../../dtos/IMovieDTO';

export default interface IMovieService {
	createMovie(reqBody: any): Promise<Result<any>>;

	findOneMovie(id: string): Promise<Result<IMovieDTO>>;

	findMovies(title: string): Promise<Result<IMovieDTO[]>>;

	findAllMovies(): Promise<Result<IMovieDTO[]>>;

	updateMovie(reqBody: any): Promise<Result<any>>;

	deleteMovie(id: string): Promise<Result<any>>;
}
