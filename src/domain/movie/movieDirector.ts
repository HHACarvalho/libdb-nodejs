import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IMovieDirector {
	value: string;
}

export class MovieDirector extends ValueObject<IMovieDirector> {
	get value(): string {
		return this.props.value;
	}

	public static create(value: string): Result<MovieDirector> {
		const guardResult = Guard.againstNullOrUndefined(value, 'movieDirector');
		if (!guardResult.succeeded) {
			return Result.fail<MovieDirector>(guardResult.message);
		}

		return Result.ok<MovieDirector>(new MovieDirector({ value: value }));
	}
}
