export class Identifier<T> {
	constructor(private readonly value: T) {
		this.value = value;
	}

	toString() {
		return String(this.value);
	}

	toValue(): T {
		return this.value;
	}
}
