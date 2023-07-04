const express = require('express')
const auth = require('../middleware/auth')
const { getSocials, getSocialDetails, createSocial, updateSocial, deleteSocial } = require('../controllers/socials')

const router = express.Router()

router.get('/', getSocials)
router.get('/:id', getSocialDetails)
router.post('/', auth, createSocial)
router.patch('/:id', auth, updateSocial)
router.delete('/:id', auth, deleteSocial)

module.exports = router