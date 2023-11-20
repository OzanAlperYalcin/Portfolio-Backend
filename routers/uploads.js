const express = require('express')
const auth = require('../middleware/auth')

const { photoUpload } = require('../controllers/uploads')

const router = express.Router()

router.post('/', auth, photoUpload)

module.exports = router