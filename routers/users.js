const express = require('express')
const auth = require('../middleware/auth')
const { getUsers, getUserDetails, updateUser, deleteUser } = require('../controllers/users')

const router = express.Router()

router.get('/', auth, getUsers)
router.get('/:id', getUserDetails)
router.patch('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

module.exports = router