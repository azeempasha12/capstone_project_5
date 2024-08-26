const User = require('../models/User');
const Movie = require('../models/Movie');
const TvSeries = require('../models/TvSeries');

exports.getUserBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('bookmarks.movies bookmarks.tv_series');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks', error });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const { type, itemId } = req.body;
    const user = await User.findById(req.params.id);
    
    if (type === 'movie') {
      user.bookmarks.movies.push(itemId);
    } else if (type === 'tv_series') {
      user.bookmarks.tv_series.push(itemId);
    }

    await user.save();
    res.status(200).json({ message: 'Bookmark added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bookmark', error });
  }
};



userController.js
