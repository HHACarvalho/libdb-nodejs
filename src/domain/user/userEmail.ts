import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IUserEmail {
	value: string;
}

export class UserEmail extends ValueObject<IUserEmail> {
	get value(): string {
		return this.props.value;
	}

	public static create(email: string): Result<UserEmail> {
		const guardResult = Guard.againstNullOrUndefined(email, 'email');

		if (!guardResult.succeeded) {
			return Result.fail<UserEmail>(guardResult.message);
		} else if (!regexEmail.test(email)) {
			return Result.fail<UserEmail>('Please insert a valid email');
		}

		return Result.ok<UserEmail>(new UserEmail({ value: email }));
	}
}

const regexEmail = new RegExp(/^[\w.]+@(\w+\.)+\w{2,4}$/);
