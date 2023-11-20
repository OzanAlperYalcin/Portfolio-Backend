const express = require('express')
const auth = require('../middleware/auth')
const { getImages, deleteImage } = require('../controllers/images')

const router = express.Router()

router.get('/', getImages)
router.delete('/:fileName', auth, deleteImage)

module.exports = router