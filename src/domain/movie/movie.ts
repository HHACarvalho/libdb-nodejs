import { Entity } from '../../core/domain/Entity';
import { EntityID } from '../../core/domain/EntityID';
import { Guard } from '../../core/infrastructure/Guard';
import { Result } from '../../core/infrastructure/Result';
import { MovieTitle } from './movieTitle';
import { MovieDirector } from './movieDirector';
import { MovieReleaseYear } from './movieReleaseYear';

interface MovieProps {
	title: MovieTitle;
	director: MovieDirector;
	releaseYear: MovieReleaseYear;
	hidden: boolean;
}

export class Movie extends Entity<MovieProps> {
	get title(): MovieTitle {
		return this._props.title;
	}

	get director(): MovieDirector {
		return this._props.director;
	}

	get releaseYear(): MovieReleaseYear {
		return this._props.releaseYear;
	}

	get hidden(): boolean {
		return this._props.hidden;
	}

	set title(value: MovieTitle) {
		this._props.title = value;
	}

	set director(value: MovieDirector) {
		this._props.director = value;
	}

	set releaseYear(value: MovieReleaseYear) {
		this._props.releaseYear = value;
	}

	set hidden(value: boolean) {
		this._props.hidden = value;
	}

	private constructor(props: MovieProps, id?: EntityID) {
		super(props, id);
	}

	public static create(props: MovieProps, id?: EntityID): Result<Movie> {
		const guardedProps = [
			{ argument: props.title, argumentName: 'movieTitle' },
			{ argument: props.director, argumentName: 'movieDirector' },
			{ argument: props.releaseYear, argumentName: 'movieReleaseYear' },
		];

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
		if (!guardResult.succeeded) {
			return Result.fail<Movie>(guardResult.message);
		}

		return Result.ok<Movie>(new Movie({ ...props }, id));
	}
}
