import Logger from '../core/loaders/loggerLoader';
import { Employee } from '../domain/employee/employee';
import { EmployeeEmail } from '../domain/employee/employeeEmail';
import { EmployeeName } from '../domain/employee/employeeName';
import { EmployeeRole } from '../domain/employee/employeeRole';
import { EmployeeSalary } from '../domain/employee/employeeSalary';
import { EntityID } from '../core/domain/EntityID';
import IEmployeeDTO from '../dtos/IEmployeeDTO';
import IEmployeePersistence from '../dtos/IEmployeePersistence';

import { Document, Model } from 'mongoose';

export class EmployeeMapper {
	public static toDomain(schema: any | Model<IEmployeePersistence & Document>): Employee {
		const employeeOrError = Employee.create(
			{
				email: EmployeeEmail.create(schema.email).value,
				firstName: EmployeeName.create(schema.firstName).value,
				lastName: EmployeeName.create(schema.lastName).value,
				role: EmployeeRole.create(schema.role).value,
				salary: EmployeeSalary.create(schema.salary).value,
				hidden: schema.hidden,
			},
			new EntityID(schema.id)
		);

		if (!employeeOrError.isSuccess) {
			Logger.error(employeeOrError.error);
		}

		return employeeOrError.isSuccess ? employeeOrError.value : null;
	}

	public static toDTO(employee: Employee): IEmployeeDTO {
		return {
			email: employee.email.value,
			firstName: employee.firstName.value,
			lastName: employee.lastName.value,
			role: employee.role.value,
			salary: employee.salary.value,
			hidden: employee.hidden,
		} as IEmployeeDTO;
	}

	public static toPersistence(employee: Employee): IEmployeePersistence {
		return {
			domainId: employee.id.toValue(),
			email: employee.email.value,
			firstName: employee.firstName.value,
			lastName: employee.lastName.value,
			role: employee.role.value,
			salary: employee.salary.value,
			hidden: employee.hidden,
		} as IEmployeePersistence;
	}
}
