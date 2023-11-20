const DoingSchema = require('../models/doing')

const getDoings = async (req, res) => {
    const { search } = req.query
    try {
        let doings
        const totalCount = await DoingSchema.countDocuments()
        if (search) {
            const query = {}
            query.title = { $regex: search, $options: 'i' }
            doings = await DoingSchema.find(query).sort({ _id: -1 })
            if (doings.length === 0) {
                return res.status(404).json({ message: 'Yer imi bulunamadı.' });
            }
        } else {
            doings = await DoingSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            doings
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getDoingDetails = async (req, res) => {
    const { id } = req.params
    try {
        const doing = await DoingSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            doing
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createDoing = async (req, res) => {
    try {
        const newDoing = await DoingSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newDoing
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateDoing = async (req, res) => {
    const { id } = req.params
    try {
        const updateDoing = await DoingSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateDoing
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteDoing = async (req, res) => {
    const { id } = req.params
    try {
        await DoingSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Madde başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getDoings, getDoingDetails, createDoing, updateDoing, deleteDoing }