const express = require('express')
const auth = require('../middleware/auth')

const { getReferences, getReferenceDetails, createReference, updateReference, deleteReference } = require('../controllers/references')

const router = express.Router()

router.get('/', getReferences)
router.get('/:id', getReferenceDetails)
router.post('/', auth, createReference)
router.patch('/:id', auth, updateReference)
router.delete('/:id', auth, deleteReference)

module.exports = router