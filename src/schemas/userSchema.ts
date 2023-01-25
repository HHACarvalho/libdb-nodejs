import mongoose from 'mongoose';
import IUserPersistence from '../dtos/IUserPersistence';

const userSchema = new mongoose.Schema(
	{
		domainId: {
			type: String,
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			index: true,
		},
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			index: true,
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
			index: true,
		},
		role: {
			type: String,
			required: [true, 'Role is required'],
			index: true,
		},
		hidden: {
			type: Boolean,
			required: [true, 'Hidden is required'],
			index: true,
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', userSchema);
