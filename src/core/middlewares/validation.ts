import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export default function validation(bodySchema: z.ZodObject<any>) {
	return function (req: Request, res: Response, next: NextFunction) {
		try {
			bodySchema.parse(req.body);
			next();
		} catch (error) {
			res.status(404);
			res.send();
		}
	};
}
