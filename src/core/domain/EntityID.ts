import { Identifier } from './Identifier';

import { v4 as uuid } from 'uuid';

export class EntityID extends Identifier<string | number> {
	constructor(id?: string | number) {
		super(id ? id : uuid());
	}
}
