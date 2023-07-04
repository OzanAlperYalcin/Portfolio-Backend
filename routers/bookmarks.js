const express = require('express')
const auth = require('../middleware/auth')
const { getBookmarks, getBookmarkDetails, createBookmark, updateBookmark, deleteBookmark } = require('../controllers/bookmarks')

const router = express.Router()

router.get('/', getBookmarks)
router.get('/:id', getBookmarkDetails)
router.post('/', auth, createBookmark)
router.patch('/:id', auth, updateBookmark)
router.delete('/:id', auth, deleteBookmark)

module.exports = router