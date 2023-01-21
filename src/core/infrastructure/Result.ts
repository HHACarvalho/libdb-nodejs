export class Result<T> {
	public isSuccess: boolean;
	private readonly _error: string;
	private readonly _value: T;

	constructor(isSuccess: boolean, error?: string, value?: T) {
		this.isSuccess = isSuccess;
		this._error = error;
		this._value = value;

		Object.freeze(this);
	}

	get error(): string {
		return this._error;
	}

	get value(): T {
		return this._value;
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, null, value);
	}

	public static fail<U>(error: any): Result<U> {
		return new Result<U>(false, error, null);
	}
}
