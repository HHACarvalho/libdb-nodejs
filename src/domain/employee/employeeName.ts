import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IEmployeeName {
	value: string;
}

export class EmployeeName extends ValueObject<IEmployeeName> {
	get value(): string {
		return this.props.value;
	}

	public static create(name: string): Result<EmployeeName> {
		const guardResult = Guard.againstNullOrUndefined(name, 'name');

		if (!guardResult.succeeded) {
			return Result.fail<EmployeeName>(guardResult.message);
		}

		return Result.ok<EmployeeName>(new EmployeeName({ value: name }));
	}
}
