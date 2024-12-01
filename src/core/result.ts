export default class Result {
	public readonly isSuccess: boolean;
	public readonly statusCode: number;
	public readonly error: string | null;
	public readonly value: any;

	private constructor(isSuccess: boolean, statusCode: number, error: string | null, value: any) {
		this.isSuccess = isSuccess;
		this.statusCode = statusCode;
		this.error = error;
		this.value = value;
		Object.freeze(this);
	}

	public static ok(value: any, statusCode: number = 200): Result {
		return new Result(true, statusCode, null, value);
	}

	public static fail(error: string, statusCode: number = 400): Result {
		return new Result(false, statusCode, error, null);
	}
}
