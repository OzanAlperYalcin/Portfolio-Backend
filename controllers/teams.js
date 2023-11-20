const TeamSchema = require('../models/team')

const getTeams = async (req, res) => {
    const { search } = req.query
    try {
        let teams
        const totalCount = await TeamSchema.countDocuments()
        if (search) {
            const query = {}
            query.name = { $regex: search, $options: 'i' }
            teams = await TeamSchema.find(query).sort({ _id: -1 })
            if (teams.length === 0) {
                return res.status(404).json({ message: 'Teknoloji bulunamadı.' });
            }
        } else {
            teams = await TeamSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            teams
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getTeamDetails = async (req, res) => {
    const { id } = req.params
    try {
        const team = await TeamSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            team
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createTeam = async (req, res) => {
    try {
        const newTeam = await TeamSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newTeam
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateTeam = async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.oldSort) {
            await TeamSchema.findOneAndUpdate({ sort: req.body.sort }, { sort: req.body.oldSort })
        }
        const updateTeam = await TeamSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateTeam
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteTeam = async (req, res) => {
    const { id } = req.params
    try {
        await TeamSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Takım üyesi başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getTeams, getTeamDetails, createTeam, updateTeam, deleteTeam }