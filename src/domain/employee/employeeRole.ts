import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IEmployeeRole {
	value: string;
}

export class EmployeeRole extends ValueObject<IEmployeeRole> {
	get value(): string {
		return this.props.value;
	}

	public static create(role: string): Result<EmployeeRole> {
		const guardResult = Guard.againstNullOrUndefined(role, 'role');

		if (!guardResult.succeeded) {
			return Result.fail<EmployeeRole>(guardResult.message);
		} else if (!roles.includes(role)) {
			return Result.fail<EmployeeRole>('The chosen role does not exist.');
		}

		return Result.ok<EmployeeRole>(new EmployeeRole({ value: role }));
	}
}

const roles = ['intern', 'human resources', 'quality assurance', 'software engineer'];
