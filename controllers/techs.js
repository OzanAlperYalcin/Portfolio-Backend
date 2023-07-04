const TechSchema = require('../models/tech')

const getTechs = async (req, res) => {
    const { search } = req.query
    try {
        let techs
        const totalCount = await TechSchema.countDocuments()
        if (search) {
            const query = {}
            query.name = { $regex: search, $options: 'i' }
            techs = await TechSchema.find(query).sort({ _id: -1 })
            if (techs.length === 0) {
                return res.status(404).json({ message: 'Teknoloji bulunamadı.' });
            }
        } else {
            techs = await TechSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            techs
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getTechDetails = async (req, res) => {
    const { id } = req.params
    try {
        const tech = await TechSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            tech
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createTech = async (req, res) => {
    try {
        const newTech = await TechSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newTech
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateTech = async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.oldSort) {
            await TechSchema.findOneAndUpdate({ sort: req.body.sort }, { sort: req.body.oldSort })
        }
        const updateTech = await TechSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateTech
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteTech = async (req, res) => {
    const { id } = req.params
    try {
        await TechSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Kabiliyet başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getTechs, getTechDetails, createTech, updateTech, deleteTech }