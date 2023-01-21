import config from '../../config';
import { Employee } from '../domain/employee/employee';
import { EmployeeMapper } from '../mappers/employeeMapper';
import IEmployeePersistence from '../dtos/IEmployeePersistence';
import IEmployeeRepo from './IRepos/IEmployeeRepo';

import { Document, Model } from 'mongoose';
import { Inject, Service } from 'typedi';

@Service()
export default class EmployeeRepo implements IEmployeeRepo {
	constructor(@Inject(config.schemas.employee.name) private schema: Model<IEmployeePersistence & Document>) {}

	public async exists(email: string): Promise<boolean> {
		const document = await this.schema.findOne({ email: email });
		return !!document === true;
	}

	public async save(employee: Employee): Promise<Employee> {
		const document = await this.schema.findOne({ email: employee.email.value });

		try {
			if (document == null) {
				const persistence = EmployeeMapper.toPersistence(employee);
				const persisted = await this.schema.create(persistence);
				return EmployeeMapper.toDomain(persisted);
			} else {
				document.email = employee.email.value;
				document.firstName = employee.firstName.value;
				document.lastName = employee.lastName.value;
				document.role = employee.role.value;
				document.salary = employee.salary.value;
				document.hidden = employee.hidden;

				const persisted = await document.save();
				return EmployeeMapper.toDomain(persisted);
			}
		} catch (e) {
			throw e;
		}
	}

	public async findAll(): Promise<Employee[]> {
		const documents = await this.schema.find();

		if (documents == null) return null;

		return documents.map((e) => EmployeeMapper.toDomain(e));
	}

	public async find(email: string): Promise<Employee> {
		const document = await this.schema.findOne({ email: email });

		if (document == null) return null;

		return EmployeeMapper.toDomain(document);
	}

	public async delete(email: string): Promise<Employee> {
		const document = await this.schema.findOne({ email: email });

		if (document == null) return null;

		return EmployeeMapper.toDomain(await document.remove());
	}
}
