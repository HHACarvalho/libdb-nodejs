import IUserPersistence from '../dtos/IUserPersistence';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', userSchema);
