const express = require('express')
const auth = require('../middleware/auth')

const { getThemeDetails, updateTheme } = require('../controllers/theme')

const router = express.Router()

router.get('/:id', getThemeDetails)
router.patch('/:id', auth, updateTheme)

module.exports = router