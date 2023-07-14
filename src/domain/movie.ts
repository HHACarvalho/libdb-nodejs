import { Entity } from '../core/domain/entity';
import { EntityID } from '../core/domain/entityID';

interface MovieProps {
	title: string;
	director: string;
	releaseYear: number;
	hidden: boolean;
}

export class Movie extends Entity<MovieProps> {
	get title(): string {
		return this._props.title;
	}

	get director(): string {
		return this._props.director;
	}

	get releaseYear(): number {
		return this._props.releaseYear;
	}

	get hidden(): boolean {
		return this._props.hidden;
	}

	set title(value: string) {
		this._props.title = value;
	}

	set director(value: string) {
		this._props.director = value;
	}

	set releaseYear(value: number) {
		this._props.releaseYear = value;
	}

	set hidden(value: boolean) {
		this._props.hidden = value;
	}

	public static create(props: MovieProps, id?: EntityID): Movie {
		return new Movie({ ...props }, id);
	}
}
