import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IRoleName {
	value: string;
}

export class RoleName extends ValueObject<IRoleName> {
	get value(): string {
		return this.props.value;
	}

	public static create(value: string): Result<RoleName> {
		const guardResult = Guard.againstNullOrUndefined(value, 'roleName');
		if (!guardResult.succeeded) {
			return Result.fail<RoleName>(guardResult.message);
		}

		return Result.ok<RoleName>(new RoleName({ value: value }));
	}
}
