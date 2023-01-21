import { EntityID } from './EntityID';

export abstract class Entity<T> {
	private readonly _id: EntityID;
	protected readonly _props: T;

	protected constructor(props: T, id?: EntityID) {
		this._id = id ? id : new EntityID();
		this._props = props;
	}

	get id(): EntityID {
		return this._id;
	}
}
