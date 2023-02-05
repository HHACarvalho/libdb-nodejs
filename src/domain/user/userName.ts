import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IUserName {
	value: string;
}

export class UserName extends ValueObject<IUserName> {
	get value(): string {
		return this.props.value;
	}

	public static create(name: string, argumentName: string): Result<UserName> {
		const guardResult = Guard.againstNullOrUndefined(name, argumentName);
		if (!guardResult.succeeded) {
			return Result.fail<UserName>(guardResult.message);
		}

		return Result.ok<UserName>(new UserName({ value: name }));
	}
}
