import IMoviePersistence from '../dtos/IMoviePersistence';

import { Document, model, Schema } from 'mongoose';

const schema = new Schema(
	{
		_id: String,
		title: String,
		director: String,
		releaseYear: Number,
		hidden: Boolean,
	},
	{
		versionKey: '_version',
		collection: 'movies_table'
	}
);

export default model<IMoviePersistence & Document>('Movie', schema);
