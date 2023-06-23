import { NextFunction, Request, Response } from 'express';

export default interface IMovieController {
	createMovie(req: Request, res: Response, next: NextFunction);

	findOneMovie(req: Request, res: Response, next: NextFunction);

	findMovies(req: Request, res: Response, next: NextFunction);

	findAllMovies(req: Request, res: Response, next: NextFunction);

	updateMovie(req: Request, res: Response, next: NextFunction);

	deleteMovie(req: Request, res: Response, next: NextFunction);
}
