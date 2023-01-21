import mongoose from 'mongoose';
import IEmployeePersistence from '../dtos/IEmployeePersistence';

const employeeSchema = new mongoose.Schema(
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
		salary: {
			type: Number,
			required: [true, 'Salary is required'],
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

export default mongoose.model<IEmployeePersistence & mongoose.Document>('Employee', employeeSchema);
