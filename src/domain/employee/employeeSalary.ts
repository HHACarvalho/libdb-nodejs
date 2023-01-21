import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IEmployeeSalary {
	value: number;
}

export class EmployeeSalary extends ValueObject<IEmployeeSalary> {
	get value(): number {
		return this.props.value;
	}

	public static create(salary: number): Result<EmployeeSalary> {
		const guardResult = Guard.againstNullOrUndefined(salary, 'salary');

		if (!guardResult.succeeded) {
			return Result.fail<EmployeeSalary>(guardResult.message);
		} else if (salary < 0) {
			return Result.fail<EmployeeSalary>("Salary can't have a negative value.");
		}

		return Result.ok<EmployeeSalary>(new EmployeeSalary({ value: salary }));
	}
}
