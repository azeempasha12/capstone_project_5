const mongoose = require('mongoose');

const tvSeriesSchema = new mongoose.Schema({
  name: String,
  first_air_date: String,
  last_air_date: String,
  status: String,
  genres: [String],
  overview: String,
  seasons: [
    {
      season_number: Number,
      episodes: [
        {
          episode_number: Number,
          title: String,
          air_date: String
        }
      ]
    }
  ],
  cast: [
    {
      name: String,
      role: String
    }
  ]
});

module.exports = mongoose.model('TvSeries', tvSeriesSchema);
