import Result from '../core/result';

import { Response } from 'express';

export default abstract class CoreController {
	protected async handleServiceCall(serviceMethod: () => Promise<Result>, res: Response) {
		try {
			const result = await serviceMethod();
			if (!result.isSuccess) {
				res.status(result.statusCode);
				res.json({ error: result.error });
			} else if (result.value === null) {
				res.status(result.statusCode);
				res.send();
			} else {
				res.status(result.statusCode);
				res.json(result.value);
			}
		} catch (error) {
			console.error(error);
			res.status(500);
			res.send();
		}
	}
}
