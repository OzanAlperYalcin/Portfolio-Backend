const express = require('express')
const auth = require('../middleware/auth')

const { getPosts, getPostDetails, getPostBySlug, createPost, updatePost, deletePost } = require('../controllers/posts')

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPostDetails)
router.get('/post/:slug', getPostBySlug)
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router