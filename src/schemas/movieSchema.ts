import IMoviePersistence from '../dtos/IMoviePersistence';

import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
		},
		title: {
			type: String,
			required: [true, 'Title is required'],
		},
		director: {
			type: String,
			required: [true, 'Director is required'],
		},
		releaseYear: {
			type: Number,
			required: [true, 'Release Year is required'],
		},
		hidden: {
			type: Boolean,
			required: [true, 'Hidden is required'],
		},
	},
	{
		versionKey: '_version',
	}
);

export default mongoose.model<IMoviePersistence & mongoose.Document>('Movie', movieSchema);
