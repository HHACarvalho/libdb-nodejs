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

	public static ok<T>(value?: T): Result<T> {
		return new Result<T>(true, null, value);
	}

	public static fail<T>(error: any): Result<T> {
		return new Result<T>(false, error, null);
	}
}
