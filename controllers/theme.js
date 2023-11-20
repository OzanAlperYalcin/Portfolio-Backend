const ThemeSchema = require('../models/theme')

const getThemeDetails = async (req, res) => {
    const { id } = req.params
    try {
        const theme = await ThemeSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            theme
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateTheme = async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.oldSort) {
            await ThemeSchema.findOneAndUpdate({ sort: req.body.sort }, { sort: req.body.oldSort })
        }
        const updateTheme = await ThemeSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateTheme
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getThemeDetails, updateTheme, }