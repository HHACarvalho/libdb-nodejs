import mongoose from 'mongoose';
import IUserPersistence from '../dtos/IUserPersistence';

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		firstName: {
			type: String,
			required: [true, 'First name is required'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
		},
		role: {
			type: String,
			required: [true, 'Role is required'],
		},
		hidden: {
			type: Boolean,
			required: [true, 'Hidden is required'],
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', userSchema);
