import config from '../../config';
import Result from '../core/result';

import { Response } from 'express';

export default abstract class CoreController {
	protected async handleServiceCall(serviceMethod: () => Promise<Result>, res: Response) {
		try {
			const result = await serviceMethod();
			res.status(result.statusCode);

			if (!result.isSuccess) {
				res.json({ error: result.error });
			} else {
				if (result.value == null) {
					res.send();
				} else if (typeof result.value === 'string') {
					res.cookie('token', result.value, { httpOnly: true, maxAge: config.JWT_DURATION * 1000 });
					res.send();
				} else {
					res.json(result.value);
				}
			}
		} catch (error) {
			console.error(error);
			res.status(500);
			res.send();
		}
	}
}
