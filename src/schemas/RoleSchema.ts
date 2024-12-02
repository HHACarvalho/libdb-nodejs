import { Document, model, Schema } from 'mongoose';

export interface IRolePersistence extends Document {
	_id: string;
	name: string;
	permissions: string[];
}

const roleSchema = new Schema<IRolePersistence>(
	{
		_id: String,
		name: String,
		permissions: [String]
	},
	{
		versionKey: '_version',
		collection: 'roles_table'
	}
);

export default model<IRolePersistence>('Role', roleSchema);
