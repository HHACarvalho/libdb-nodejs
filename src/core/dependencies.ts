import { TYPES } from '../../config';

import { IRolePersistence } from '../schemas/roleSchema';
import roleSchema from '../schemas/roleSchema';
import IRoleRepo from '../repos/IRepos/IRoleRepo';
import RoleRepo from '../repos/roleRepo';
import IRoleService from '../services/IServices/IRoleService';
import RoleService from '../services/roleService';
import RoleController from '../controllers/roleController';
import { IUserPersistence } from '../schemas/userSchema';
import userSchema from '../schemas/userSchema';
import IUserRepo from '../repos/IRepos/IUserRepo';
import UserRepo from '../repos/userRepo';
import IUserService from '../services/IServices/IUserService';
import UserService from '../services/userService';
import UserController from '../controllers/userController';

import { Container } from 'inversify';
import { Model } from 'mongoose';

const container = new Container();

container.bind<Model<IRolePersistence>>(TYPES.IRoleSchema).toConstantValue(roleSchema);
container.bind<IRoleRepo>(TYPES.IRoleRepo).to(RoleRepo);
container.bind<IRoleService>(TYPES.IRoleService).to(RoleService);
container.bind<RoleController>(RoleController).toSelf();

container.bind<Model<IUserPersistence>>(TYPES.IUserSchema).toConstantValue(userSchema);
container.bind<IUserRepo>(TYPES.IUserRepo).to(UserRepo);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<UserController>(UserController).toSelf();

export default container;
