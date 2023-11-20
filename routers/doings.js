const express = require('express')
const auth = require('../middleware/auth')
const { getDoings, getDoingDetails, createDoing, updateDoing, deleteDoing } = require('../controllers/doings')

const router = express.Router()

router.get('/', getDoings)
router.get('/:id', getDoingDetails)
router.post('/', auth, createDoing)
router.patch('/:id', auth, updateDoing)
router.delete('/:id', auth, deleteDoing)

module.exports = router