import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IRoleDescription {
	value: string;
}

export class RoleDescription extends ValueObject<IRoleDescription> {
	get value(): string {
		return this.props.value;
	}

	public static create(value: string): Result<RoleDescription> {
		const guardResult = Guard.againstNullOrUndefined(value, 'roleDescription');
		if (!guardResult.succeeded) {
			return Result.fail<RoleDescription>(guardResult.message);
		}

		return Result.ok<RoleDescription>(new RoleDescription({ value: value }));
	}
}
