import 'reflect-metadata';

import config from '../../config';
import Logger from '../../src/core/loaders/loggerLoader';
import { Result } from '../../src/core/Result';
import IRoleDTO from '../../src/dtos/IRoleDTO';
import IRoleService from '../../src/services/IServices/IRoleService';
import RoleController from '../../src/controllers/roleController';

import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import * as sinon from 'sinon';

describe('Role controller', function () {
	const sandbox = sinon.createSandbox();

	const body = {
		name: 'Default',
		description: 'Description of Default',
	};

	const query = {
		name: 'Default',
	};

	beforeEach(function () {
		Container.reset();

		Container.set('logger', Logger);

		let roleSchemaInstance = require('../../src/schemas/' + config.schemas.role).default;
		Container.set(config.schemas.role, roleSchemaInstance);

		let roleRepoClass = require('../../src/repos/' + config.repos.role).default;
		let roleRepoInstance = Container.get(roleRepoClass);
		Container.set(config.repos.role, roleRepoInstance);

		let roleServiceClass = require('../../src/services/' + config.services.role).default;
		let roleServiceInstance = Container.get(roleServiceClass);
		Container.set(config.services.role, roleServiceInstance);
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('Create role - success', async function () {
		const req: Partial<Request> = { body: body };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'createRole').returns(
			Result.ok<IRoleDTO>({
				name: req.body.name,
				description: req.body.description,
			})
		);

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.createRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(201));
		sinon.assert.calledWith(
			res.json,
			sinon.match({
				name: req.body.name,
				description: req.body.description,
			})
		);
	});

	it('Create role - fail', async function () {
		const req: Partial<Request> = { body: body };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon
			.stub(roleServiceInstance, 'createRole')
			.returns(Result.fail<IRoleDTO>('Role with name=' + req.body.name + ' already exists'));

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.createRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(400));
		sinon.assert.calledWith(res.json, sinon.match('Role with name=' + req.body.name + ' already exists'));
	});

	it('Find all roles - success', async function () {
		const req: Partial<Request> = {};
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'findAllRoles').returns(Result.ok<IRoleDTO[]>([]));

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.findAllRoles(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(200));
		sinon.assert.calledWith(res.json, sinon.match([]));
	});

	it('Find all roles - fail', async function () {
		const req: Partial<Request> = {};
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'findAllRoles').returns(Result.fail<IRoleDTO[]>('There are no roles'));

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.findAllRoles(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(404));
		sinon.assert.calledWith(res.json, sinon.match('There are no roles'));
	});

	it('Update role - success', async function () {
		const req: Partial<Request> = { body: body };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'updateRole').returns(
			Result.ok<IRoleDTO>({
				name: req.body.name,
				description: req.body.description,
			})
		);

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.updateRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(200));
		sinon.assert.calledWith(
			res.json,
			sinon.match({
				name: req.body.name,
				description: req.body.description,
			})
		);
	});

	it('Update role - fail', async function () {
		const req: Partial<Request> = { body: body };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon
			.stub(roleServiceInstance, 'updateRole')
			.returns(Result.fail<IRoleDTO>('No role with name=' + req.body.name + ' was found'));

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.updateRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(404));
		sinon.assert.calledWith(res.json, sinon.match('No role with name=' + req.body.name + ' was found'));
	});

	it('Delete role - success', async function () {
		const req: Partial<Request> = { query: query };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'deleteRole').returns(
			Result.ok<IRoleDTO>({
				name: 'Default',
				description: 'Description of Default',
			})
		);

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.deleteRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(204));
		sinon.assert.calledWith(
			res.json,
			sinon.match({
				name: 'Default',
				description: 'Description of Default',
			})
		);
	});

	it('Delete role - fail', async function () {
		const req: Partial<Request> = { query: query };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon
			.stub(roleServiceInstance, 'deleteRole')
			.returns(Result.fail<IRoleDTO>('No role with name=' + req.query.name + ' was found'));

		const logger = Container.get('logger');
		const controller = new RoleController(roleServiceInstance as IRoleService, logger);
		await controller.deleteRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(404));
		sinon.assert.calledWith(res.json, sinon.match('No role with name=' + req.query.name + ' was found'));
	});
});
