import config from '../../../config';

import { connect, set } from 'mongoose';

export default async () => {
	set('strictQuery', false);
	await connect(config.databaseURL);
};
