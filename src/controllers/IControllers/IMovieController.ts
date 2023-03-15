import { NextFunction, Request, Response } from 'express';

export default interface IMovieController {
	createMovie(req: Request, res: Response, next: NextFunction);

	getMovie(req: Request, res: Response, next: NextFunction);

	getAllMovies(req: Request, res: Response, next: NextFunction);

	updateMovie(req: Request, res: Response, next: NextFunction);

	deleteMovie(req: Request, res: Response, next: NextFunction);

	toggleMovie(req: Request, res: Response, next: NextFunction);
}
