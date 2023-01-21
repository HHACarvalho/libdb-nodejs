import config from '../../../config';

import mongoose from 'mongoose';

export default async () => {
	mongoose.set('strictQuery', false);
	await mongoose.connect(config.databaseURL);
};
