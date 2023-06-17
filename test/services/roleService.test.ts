import 'reflect-metadata';

import config from '../../config';
import { Role } from '../../src/domain/role';
import IRoleRepo from '../../src/repos/IRepos/IRoleRepo';
import RoleService from '../../src/services/roleService';

import { Container } from 'typedi';
import * as sinon from 'sinon';

describe('Role service', function () {
	const sandbox = sinon.createSandbox();

	const body = {
		name: 'Default',
		description: 'Description of Default',
	};

	const obj = Role.create({
		name: body.name,
		description: body.description,
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
		sinon.stub(roleRepoInstance, 'exists').returns(Promise.resolve(false));
		sinon.stub(roleRepoInstance, 'createRole').returns(Promise.resolve(obj));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.createRole(body);

		sinon.assert.match(returnValue.value.name, body.name);
		sinon.assert.match(returnValue.value.description, body.description);
	});

	it('Create role - fail', async function () {
		const roleRepoInstance = Container.get(config.repos.role);
		sinon.stub(roleRepoInstance, 'exists').returns(Promise.resolve(true));

		const service = new RoleService(roleRepoInstance as IRoleRepo);
		const returnValue = await service.createRole(body);

		sinon.assert.match(returnValue.error, 'Role with name=' + body.name + ' already exists');
	});
});
