const ProjectSchema = require('../models/project')

const getProjects = async (req, res) => {
    const { search } = req.query
    try {
        let projects
        const totalCount = await ProjectSchema.countDocuments()
        if (search) {
            const query = {}
            query.name = { $regex: search, $options: 'i' }
            projects = await ProjectSchema.find(query).sort({ _id: -1 })
            if (projects.length === 0) {
                return res.status(404).json({ message: 'Proje bulunamadı.' });
            }
        } else {
            projects = await ProjectSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            projects
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getProjectDetails = async (req, res) => {
    const { id } = req.params
    try {
        const project = await ProjectSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            project
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createProject = async (req, res) => {
    try {
        const newProject = await ProjectSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newProject
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateProject = async (req, res) => {
    const { id } = req.params
    try {
        const updateProject = await ProjectSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateProject
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteProject = async (req, res) => {
    const { id } = req.params
    try {
        await ProjectSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Proje başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getProjects, getProjectDetails, createProject, updateProject, deleteProject }