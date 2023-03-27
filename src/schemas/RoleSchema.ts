import IRolePersistence from '../dtos/IRolePersistence';

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Role', roleSchema);
