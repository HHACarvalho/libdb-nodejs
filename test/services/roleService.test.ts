import 'reflect-metadata';

import config from '../../config';
import { IRoleDTO } from '../../src/dtos/IRoleDTO';
import { Result } from '../../src/core/result';
import { Role } from '../../src/domain/role';
import IRoleRepo from '../../src/repos/IRepos/IRoleRepo';
import RoleService from '../../src/services/roleService';

import { Container } from 'typedi';
import * as sinon from 'sinon';

describe('Role service', function () {
	const sandbox = sinon.createSandbox();

	const body = {
		name: 'Default',
		permissions: {
			manageMovies: false,
			manageRoles: false,
			manageUsers: false,
		},
	};

	const updatedBody = {
		name: 'Default',
		permissions: {
			manageMovies: true,
			manageRoles: true,
			manageUsers: true,
		},
	};

	const obj = Role.create({
		name: body.name,
		permissions: body.permissions,
	});

	const updatedObj = Role.create({
		name: updatedBody.name,
		permissions: updatedBody.permissions,
	});

	beforeEach(function () {
		Container.reset();

		let roleSchemaInstance = require('../../src/schemas/' + config.schemas.role).default;
		Container.set(config.schemas.role, roleSchemaInstance);

		let roleRepoClass = require('../../src/repos/' + config.repos.role).default;
		let roleRepoInstance = Container.get(roleRepoClass);
		Container.set(config.repos.role, roleRepoInstance);
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('Create role - success', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'findRole').returns(Promise.resolve(null));
		sinon.stub(roleRepoInstance, 'createRole').returns(Promise.resolve(obj));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.createRole(body);

		sinon.assert.match(returnValue, Result.ok<IRoleDTO>(body));
	});

	it('Create role - failure', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'findRole').returns(Promise.resolve(obj));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.createRole(body);

		sinon.assert.match(returnValue.error, 'Role with the name "' + body.name + '" already exists');
	});

	it('Find all roles - success', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'findAllRoles').returns(Promise.resolve([obj]));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.findAllRoles();

		sinon.assert.match(returnValue, Result.ok<IRoleDTO[]>([body]));
	});

	it('Find all roles - failure', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'findAllRoles').returns(Promise.resolve([]));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.findAllRoles();

		sinon.assert.match(returnValue.error, 'There are no roles');
	});

	it('Update role - success', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'findRole').returns(Promise.resolve(obj));
		sinon.stub(roleRepoInstance, 'updateRole').returns(Promise.resolve(updatedObj));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.updateRole(body.name, updatedBody);

		sinon.assert.match(returnValue, Result.ok<IRoleDTO>(updatedBody));
	});

	it('Update role - failure', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'findRole').returns(Promise.resolve(null));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.updateRole(body.name, updatedBody);

		sinon.assert.match(returnValue, Result.fail<any>('No role with the name "' + body.name + '" was found'));
	});

	it('Delete role - success', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'deleteRole').returns(Promise.resolve(updatedObj));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.deleteRole(updatedBody.name);

		sinon.assert.match(returnValue, Result.ok<IRoleDTO>(updatedBody));
	});

	it('Delete role - failure', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'deleteRole').returns(Promise.resolve(null));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.deleteRole(updatedBody.name);

		sinon.assert.match(returnValue, Result.fail<any>('No role with the name "' + updatedBody.name + '" was found'));
	});
});
