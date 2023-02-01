export interface IGuardResult {
	succeeded: boolean;
	message?: string;
}

export interface IGuardArgument {
	argument: any;
	argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
	public static againstNullOrUndefined(value: any, argumentName: string): IGuardResult {
		if (value === null || value === undefined) {
			return { succeeded: false, message: `Guard: ${argumentName} is null or undefined` };
		}

		return { succeeded: true };
	}

	public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
		for (let arg of args) {
			const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
			if (!result.succeeded) return result;
		}

		return { succeeded: true };
	}

	public static againstInvalidLength(value: string, length: number, argumentName: string): IGuardResult {
		if (value.length < length) {
			return { succeeded: false, message: `Guard: ${argumentName} contains an invalid length` };
		}

		return { succeeded: true };
	}

	public static againstInvalidFormat(value: string, regex: RegExp, argumentName: string): IGuardResult {
		if (!regex.test(value)) {
			return { succeeded: false, message: `Guard: ${argumentName} contains an invalid format` };
		}

		return { succeeded: true };
	}

	public static againstNegativeNumber(argument: number, argumentName: string): IGuardResult {
		if (argument < 0) {
			return { succeeded: false, message: `Guard: ${argumentName} contains a negative value` };
		}

		return { succeeded: true };
	}

	public static isOneOf(value: any, validValues: any[], argumentName: string): IGuardResult {
		for (let validValue of validValues) {
			if (value === validValue) {
				return { succeeded: true };
			}
		}

		return {
			succeeded: false,
			message: `Guard: ${argumentName} isn't one of ${JSON.stringify(validValues)}. Got "${value}"`,
		};
	}
}
