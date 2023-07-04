const express = require('express')
const auth = require('../middleware/auth')
const { getTechs, getTechDetails, createTech, updateTech, deleteTech } = require('../controllers/techs')

const router = express.Router()

router.get('/', getTechs)
router.get('/:id', getTechDetails)
router.post('/', auth, createTech)
router.patch('/:id', auth, updateTech)
router.delete('/:id', auth, deleteTech)

module.exports = router