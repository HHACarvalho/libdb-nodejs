import { Document, model, Schema } from 'mongoose';

export interface IUserPersistence extends Document {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	roleId: string;
}

const userSchema = new Schema<IUserPersistence>(
	{
		_id: String,
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		roleId: String
	},
	{
		versionKey: '_version',
		collection: 'users_table'
	}
);

export default model<IUserPersistence>('User', userSchema);
