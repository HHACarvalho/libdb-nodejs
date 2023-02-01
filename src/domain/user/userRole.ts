import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IUserRole {
	value: string;
}

export class UserRole extends ValueObject<IUserRole> {
	get value(): string {
		return this.props.value;
	}

	public static create(role: string): Result<UserRole> {
		let guardResult;

		guardResult = Guard.againstNullOrUndefined(role, 'role');
		if (!guardResult.succeeded) {
			return Result.fail<UserRole>(guardResult.message);
		}

		guardResult = Guard.isOneOf(role, roles, 'role')
		if (!guardResult.succeeded) {
			return Result.fail<UserRole>(guardResult.message);
		}

		return Result.ok<UserRole>(new UserRole({ value: role }));
	}
}

const roles = ['default', 'moderator', 'admin'];
