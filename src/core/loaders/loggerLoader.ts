import config from '../../../config';

import winston from 'winston';

const transports = [];

if (config.environment === 'production') {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
		})
	);
} else {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.splat(), winston.format.cli()),
		})
	);
}

const LoggerInstance = winston.createLogger({
	level: 'info',
	levels: winston.config.npm.levels,
	transports,
});

export default LoggerInstance;
