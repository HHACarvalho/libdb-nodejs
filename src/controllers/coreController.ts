import { CONFIG } from '../../config';
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
				} else if (result.value.set_token) {
					res.cookie('token', result.value.set_token, { httpOnly: true, maxAge: CONFIG.JWT_DURATION * 1000 }).send();
				} else if (result.value.clear_token) {
					res.clearCookie('token').send();
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
