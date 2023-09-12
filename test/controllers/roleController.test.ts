import 'reflect-metadata';

import config from '../../config';
import Logger from '../../src/core/loaders/loggerLoader';
import { IRoleDTO } from '../../src/dtos/IRoleDTO';
import { Result } from '../../src/core/result';
import IRoleService from '../../src/services/IServices/IRoleService';
import RoleController from '../../src/controllers/roleController';

import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import * as sinon from 'sinon';

describe('Role controller', function () {
	const sandbox = sinon.createSandbox();

	const body = {
		name: 'Default',
		permissions: {
			manageMovies: false,
			manageRoles: false,
			manageUsers: false,
		},
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
				permissions: req.body.permissions,
			})
		);

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.createRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(201));
		sinon.assert.calledWith(res.json, sinon.match(body));
	});

	it('Create role - failure', async function () {
		const req: Partial<Request> = { body: body };
		const res: Partial<Response> = { status: sinon.spy(), send: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon
			.stub(roleServiceInstance, 'createRole')
			.returns(Result.fail<IRoleDTO>('Role with the name "' + body.name + '" already exists'));

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.createRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(400));
		sinon.assert.calledWith(res.send, sinon.match('Role with the name "' + body.name + '" already exists'));
	});

	it('Find all roles - success', async function () {
		const req: Partial<Request> = {};
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'findAllRoles').returns(Result.ok<IRoleDTO[]>([]));

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.findAllRoles(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(200));
		sinon.assert.calledWith(res.json, sinon.match([]));
	});

	it('Find all roles - failure', async function () {
		const req: Partial<Request> = {};
		const res: Partial<Response> = { status: sinon.spy(), send: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'findAllRoles').returns(Result.fail<IRoleDTO[]>('There are no roles'));

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.findAllRoles(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(404));
		sinon.assert.calledWith(res.send, sinon.match('There are no roles'));
	});

	it('Update role - success', async function () {
		const req: Partial<Request> = { query: query, body: body };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'updateRole').returns(
			Result.ok<IRoleDTO>({
				name: req.body.name,
				permissions: req.body.permissions,
			})
		);

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.updateRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(200));
		sinon.assert.calledWith(res.json, sinon.match(body));
	});

	it('Update role - failure', async function () {
		const req: Partial<Request> = { query: query, body: body };
		const res: Partial<Response> = { status: sinon.spy(), send: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon
			.stub(roleServiceInstance, 'updateRole')
			.returns(Result.fail<IRoleDTO>('No role with the name "' + req.body.name + '" was found'));

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.updateRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(404));
		sinon.assert.calledWith(res.send, sinon.match('No role with the name "' + req.body.name + '" was found'));
	});

	it('Delete role - success', async function () {
		const req: Partial<Request> = { query: query };
		const res: Partial<Response> = { status: sinon.spy(), json: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon.stub(roleServiceInstance, 'deleteRole').returns(
			Result.ok<IRoleDTO>({
				name: body.name,
				permissions: body.permissions,
			})
		);

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.deleteRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(200));
		sinon.assert.calledWith(res.json, sinon.match(body));
	});

	it('Delete role - failure', async function () {
		const req: Partial<Request> = { query: query };
		const res: Partial<Response> = { status: sinon.spy(), send: sinon.spy() };
		const next: Partial<NextFunction> = () => {};

		const roleServiceInstance = Container.get(config.services.role);
		sinon
			.stub(roleServiceInstance, 'deleteRole')
			.returns(Result.fail<IRoleDTO>('No role with the name "' + req.query.name + '" was found'));

		const controller = new RoleController(roleServiceInstance as IRoleService);
		await controller.deleteRole(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledWith(res.status, sinon.match(404));
		sinon.assert.calledWith(res.send, sinon.match('No role with the name "' + req.query.name + '" was found'));
	});
});
