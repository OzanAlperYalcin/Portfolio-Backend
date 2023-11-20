const express = require('express')
const auth = require('../middleware/auth')
const { getTeams, getTeamDetails, createTeam, updateTeam, deleteTeam } = require('../controllers/teams')

const router = express.Router()

router.get('/', getTeams)
router.get('/:id', getTeamDetails)
router.post('/', auth, createTeam)
router.patch('/:id', auth, updateTeam)
router.delete('/:id', auth, deleteTeam)

module.exports = router