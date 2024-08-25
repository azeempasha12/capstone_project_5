const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  release_date: String,
  genres: [String],
  poster_path: String,
  overview: String,
  cast: [
    {
      name: String,
      role: String
    }
  ]
});

module.exports = mongoose.model('Movie', movieSchema);
