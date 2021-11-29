const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
    posterurl: {
      type: String,
      required: true,
    },
    contentRating: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    storyline: {
      type: String,
      required: true,
    },
    actors: {
      type: Array,
      required: true
    },
    imdbRating: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'movies'
  },
);

module.exports = mongoose.model('Movies', movieSchema);

