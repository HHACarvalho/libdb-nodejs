import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IMovieTitle {
	value: string;
}

export class MovieTitle extends ValueObject<IMovieTitle> {
	get value(): string {
		return this.props.value;
	}

	public static create(value: string): Result<MovieTitle> {
		const guardResult = Guard.againstNullOrUndefined(value, 'movieTitle');
		if (!guardResult.succeeded) {
			return Result.fail<MovieTitle>(guardResult.message);
		}

		return Result.ok<MovieTitle>(new MovieTitle({ value: value }));
	}
}
