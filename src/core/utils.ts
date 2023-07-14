export class Utils {
	static logMessage(success: boolean, method: string) {
		const currentDate = new Date();

		return (
			(success ? 'SUCCESS' : 'FAILURE') +
			' | ' +
			method +
			'() request received -> ' +
			currentDate.getDate() +
			'/' +
			(currentDate.getMonth() + 1) +
			'/' +
			currentDate.getFullYear() +
			' T ' +
			currentDate.getHours() +
			':' +
			currentDate.getMinutes() +
			':' +
			currentDate.getSeconds()
		);
	}
}
