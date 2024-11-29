import { Result } from '../core/result';

import { Response } from 'express';

export default abstract class CoreController {
	protected async handleServiceCall(serviceMethod: () => Promise<Result<any>>, res: Response) {
		try {
			const result = await serviceMethod();
			if (!result.isSuccess) {
				res.status(400); //TODO: add status code to result
				res.json({ error: result.error });
			} else if (result.value === null) {
				res.sendStatus(200); //TODO: add status code to result
			} else {
				res.status(200); //TODO: add status code to result
				res.json(result.value);
			}
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	}
}
