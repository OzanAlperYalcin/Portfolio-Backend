const express = require('express')
const auth = require('../middleware/auth')
const { register, login, changePassword } = require('../controllers/auth')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/change-password', auth, changePassword)

module.exports = router