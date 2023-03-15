import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { ValueObject } from '../../core/domain/ValueObject';

interface IMovieReleaseYear {
	value: number;
}

export class MovieReleaseYear extends ValueObject<IMovieReleaseYear> {
	get value(): number {
		return this.props.value;
	}

	public static create(value: number): Result<MovieReleaseYear> {
		let guardResult;

		guardResult = Guard.againstNullOrUndefined(value, 'movieReleaseYear');
		if (!guardResult.succeeded) {
			return Result.fail<MovieReleaseYear>(guardResult.message);
		}

		guardResult = Guard.isInRange(value, 1888, Infinity, 'movieReleaseYear');
		if (!guardResult.succeeded) {
			return Result.fail<MovieReleaseYear>(guardResult.message);
		}

		return Result.ok<MovieReleaseYear>(new MovieReleaseYear({ value: value }));
	}
}
