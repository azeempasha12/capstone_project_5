const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  bookmarks: {
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    tv_series: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TvSeries' }]
  },
});

module.exports = mongoose.model('User', userSchema);
