import IMoviePersistence from '../dtos/IMoviePersistence';

import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
		},
		title: {
			type: String,
			required: true,
		},
		director: {
			type: String,
			required: true,
		},
		releaseYear: {
			type: Number,
			required: true,
		},
		hidden: {
			type: Boolean,
			required: true,
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IMoviePersistence & mongoose.Document>('Movie', movieSchema);
