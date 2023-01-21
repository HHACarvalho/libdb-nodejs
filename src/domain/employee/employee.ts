import { Entity } from '../../core/domain/Entity';
import { EntityID } from '../../core/domain/EntityID';
import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { EmployeeEmail } from './employeeEmail';
import { EmployeeName } from './employeeName';
import { EmployeeRole } from './employeeRole';
import { EmployeeSalary } from './employeeSalary';

interface EmployeeProps {
	email: EmployeeEmail;
	firstName: EmployeeName;
	lastName: EmployeeName;
	role: EmployeeRole;
	salary: EmployeeSalary;
	hidden: boolean;
}

export class Employee extends Entity<EmployeeProps> {
	get email(): EmployeeEmail {
		return this._props.email;
	}

	get firstName(): EmployeeName {
		return this._props.firstName;
	}

	get lastName(): EmployeeName {
		return this._props.lastName;
	}

	get role(): EmployeeRole {
		return this._props.role;
	}

	get salary(): EmployeeSalary {
		return this._props.salary;
	}

	get hidden(): boolean {
		return this._props.hidden;
	}

	set email(value: EmployeeEmail) {
		this._props.email = value;
	}

	set firstName(value: EmployeeName) {
		this._props.firstName = value;
	}

	set lastName(value: EmployeeName) {
		this._props.lastName = value;
	}

	set role(value: EmployeeRole) {
		this._props.role = value;
	}

	set salary(value: EmployeeSalary) {
		this._props.salary = value;
	}

	set hidden(value: boolean) {
		this._props.hidden = value;
	}

	private constructor(props: EmployeeProps, id?: EntityID) {
		super(props, id);
	}

	public static create(props: EmployeeProps, id?: EntityID): Result<Employee> {
		const guardedProps = [
			{ argument: props.email, argumentName: 'email' },
			{ argument: props.firstName, argumentName: 'firstName' },
			{ argument: props.lastName, argumentName: 'lastName' },
			{ argument: props.role, argumentName: 'role' },
			{ argument: props.salary, argumentName: 'salary' },
			{ argument: props.hidden, argumentName: 'hidden' },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

		if (!guardResult.succeeded) {
			return Result.fail<Employee>(guardResult.message);
		} else {
			return Result.ok<Employee>(new Employee({ ...props }, id));
		}
	}
}
