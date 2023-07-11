import config from '../../config';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJwt = (req: Request, res: Response, next: NextFunction) => {
	try {
		req['token'] = jwt.verify(req.cookies.token, config.jwtAccessSecret);
		next();
	} catch (e) {
		res.status(401);
		next(e);
	}
};

export const validatePermissions = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			checkUserRole(roles, req['token'].role);
			next();
		} catch (e) {
			res.status(403);
			next(e);
		}
	};
};

function checkUserRole(roles: string[], userRole: string) {
	if (!roles.includes(userRole)) {
		throw new jwt.JsonWebTokenError('insufficient permissions');
	}
}
