const SocialSchema = require('../models/social')

const getSocials = async (req, res) => {
    const { search } = req.query
    try {
        let socials
        const totalCount = await SocialSchema.countDocuments()
        if (search) {
            const query = {}
            query.name = { $regex: search, $options: 'i' }
            socials = await SocialSchema.find(query).sort({ _id: -1 })
            if (socials.length === 0) {
                return res.status(404).json({ message: 'Sosyal medya bulunamadı.' });
            }
        } else {
            socials = await SocialSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            socials
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getSocialDetails = async (req, res) => {
    const { id } = req.params
    try {
        const social = await SocialSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            social
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createSocial = async (req, res) => {
    try {
        const newSocial = await SocialSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newSocial
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateSocial = async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.oldSort) {
            await SocialSchema.findOneAndUpdate({ sort: req.body.sort }, { sort: req.body.oldSort })
        }
        const updateSocial = await SocialSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateSocial
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteSocial = async (req, res) => {
    const { id } = req.params
    try {
        await SocialSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Sosyal medya başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getSocials, getSocialDetails, createSocial, updateSocial, deleteSocial }