const ReferenceSchema = require('../models/reference')

const getReferences = async (req, res) => {
    const { search } = req.query
    try {
        let references
        const totalCount = await ReferenceSchema.countDocuments()
        if (search) {
            const query = {}
            query.title = { $regex: search, $options: 'i' }
            references = await ReferenceSchema.find(query).sort({ _id: -1 })
            if (references.length === 0) {
                return res.status(404).json({ message: 'Referans bulunamadı.' });
            }
        } else {
            references = await ReferenceSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            references
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getReferenceDetails = async (req, res) => {
    const { id } = req.params
    try {
        const reference = await ReferenceSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            reference
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createReference = async (req, res) => {
    try {
        const newReference = await ReferenceSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newReference
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateReference = async (req, res) => {
    const { id } = req.params
    try {
        const updatedReference = await ReferenceSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updatedReference
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteReference = async (req, res) => {
    const { id } = req.params
    try {
        await ReferenceSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Referans başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getReferences, getReferenceDetails, createReference, updateReference, deleteReference }