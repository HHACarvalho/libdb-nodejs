import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IEmployeeEmail {
	value: string;
}

export class EmployeeEmail extends ValueObject<IEmployeeEmail> {
	get value(): string {
		return this.props.value;
	}

	public static create(email: string): Result<EmployeeEmail> {
		const guardResult = Guard.againstNullOrUndefined(email, 'email');

		if (!guardResult.succeeded) {
			return Result.fail<EmployeeEmail>(guardResult.message);
		} else if (!regexEmail.test(email)) {
			return Result.fail<EmployeeEmail>('Please insert a valid email');
		}

		return Result.ok<EmployeeEmail>(new EmployeeEmail({ value: email }));
	}
}

const regexEmail = new RegExp(/^[\w.]+@(\w+\.)+\w{2,4}$/);
