import IRolePersistence from '../dtos/IRolePersistence';

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		description: {
			type: String,
			required: [true, 'Description is required'],
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Role', roleSchema);
