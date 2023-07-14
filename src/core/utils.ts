export class Utils {
	static logMessage(success: boolean, method: string) {
		const currentDate = new Date();

		return (
			(success ? 'SUCCESS' : 'FAILURE') +
			' | ' +
			method +
			'() request received -> ' +
			String(currentDate.getDate()).padStart(2, '0') +
			'/' +
			String(currentDate.getMonth() + 1).padStart(2, '0') +
			'/' +
			currentDate.getFullYear() +
			' T ' +
			String(currentDate.getHours()).padStart(2, '0') +
			':' +
			String(currentDate.getMinutes()).padStart(2, '0') +
			':' +
			String(currentDate.getSeconds()).padStart(2, '0')
		);
	}
}
