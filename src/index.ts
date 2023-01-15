import express from 'express';

function startServer() {
	const app = express();

	app.listen(3000, () => {
		console.log('Listening on port 3000!');
	});
}

startServer();
