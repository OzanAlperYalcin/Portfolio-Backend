const UserSchema = require('../models/users')

const getUsers = async (_, res) => {
    try {
        const totalUsers = await UserSchema.countDocuments()
        const usersData = await UserSchema.find().sort({ _id: -1 })
        const users = usersData.map(user => {
            user.password = ''
            return user
        })
        res.status(200).json({
            status: 'OK',
            totalUsers,
            users
        })

    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

const getUserDetails = async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserSchema.findById(id)

        if (!user) {
            return res.status(406).json({ message: 'Böyle bir kullanıcı bulunamadı.' })
        }
        user.password = ''
        res.status(200).json({
            status: 'OK',
            user
        })
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    try {
        const updateUser = await UserSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updateUser
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await UserSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Kullanıcı başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getUsers, getUserDetails, updateUser, deleteUser }