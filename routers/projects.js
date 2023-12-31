const express = require('express')
const auth = require('../middleware/auth')

const { getProjects, getProjectDetails, getProjectBySlug, createProject, updateProject, deleteProject } = require('../controllers/projects')

const router = express.Router()

router.get('/', getProjects)
router.get('/:id', getProjectDetails)
router.get('/project/:slug', getProjectBySlug)
router.post('/', auth, createProject)
router.patch('/:id', auth, updateProject)
router.delete('/:id', auth, deleteProject)

module.exports = router