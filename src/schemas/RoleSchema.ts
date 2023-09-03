import { IRolePersistence } from '../dtos/IRoleDTO';

import { Document, model, Schema } from 'mongoose';

const schema = new Schema(
	{
		_id: String,
		name: String,
		permissions: {
			manageMovies: Boolean,
			manageRoles: Boolean,
			manageUsers: Boolean,
		},
	},
	{
		versionKey: '_version',
		collection: 'roles_table',
	}
);

export default model<IRolePersistence & Document>('Role', schema);
