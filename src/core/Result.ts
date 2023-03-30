export class Result<T> {
	public readonly isSuccess: boolean;
	public readonly error: string;
	public readonly value: T;

	constructor(isSuccess: boolean, error?: string, value?: T) {
		this.isSuccess = isSuccess;
		this.error = error;
		this.value = value;
		Object.freeze(this);
	}

	public static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, null, value);
	}

	public static fail<U>(error: any): Result<U> {
		return new Result<U>(false, error, null);
	}
}
