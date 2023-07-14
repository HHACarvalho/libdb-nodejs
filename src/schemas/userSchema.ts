import IUserPersistence from '../dtos/IUserPersistence';

import { Document, model, Schema } from 'mongoose';

const schema = new Schema(
	{
		_id: String,
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		role: String,
	},
	{
		versionKey: '_version',
		collection: 'users_table'
	}
);

export default model<IUserPersistence & Document>('User', schema);
