const express = require('express');
const router = express.Router();
const { getUserBookmarks, addBookmark } = require('../controllers/userController');

router.get('/:id/bookmarks', getUserBookmarks);
router.post('/:id/bookmark', addBookmark);

module.exports = router;
