import { v4 as uuid } from 'uuid';

export class EntityID {
	private readonly value: string;

	constructor(value?: string) {
		this.value = value ? value : uuid();
	}

	getValue(): string {
		return this.value;
	}
}
