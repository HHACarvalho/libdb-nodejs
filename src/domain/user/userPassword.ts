import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IUserPassword {
	value: string;
}

export class UserPassword extends ValueObject<IUserPassword> {
	get value(): string {
		return this.props.value;
	}

	public static create(password: string): Result<UserPassword> {
		const guardResult = Guard.againstNullOrUndefined(password, 'password');
		if (!guardResult.succeeded) {
			return Result.fail<UserPassword>(guardResult.message);
		}

		return Result.ok<UserPassword>(new UserPassword({ value: password }));
	}
}
