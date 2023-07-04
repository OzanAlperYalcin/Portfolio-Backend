const UserSchema = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async ( req, res ) => {
    const { email, password, passwordRepeat } = req.body
    try {
        const user = await UserSchema.findOne({email})
        if (user) {
            return res.status(406).json({message: 'Bu email adresine ait hesap bulunmaktadır.'})
        }
        if (password !== passwordRepeat) {
            return res.status(406).json({message: 'Şifreler birbiriyle uyuşmuyor.'})
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = await UserSchema.create({...req.body, password: passwordHash})
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.status(200).json({
            status: 'OK',
            token,
            newUser
        })
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

const login = async ( req, res ) => {
    const { email, password } = req.body
    try {
        const user = await UserSchema.findOne({email})
        if (!user) {
            return res.status(406).json({message: 'Bu email adresine ait hesap bulunmamaktadır.'})
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(406).json({message: 'Girmiş olduğunuz şifre hatalıdır.'})
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.status(200).json({
            status: 'OK',
            token,
            user
        })

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

const changePassword = async ( req, res ) => {
    const { id, oldPassword, password, passwordRepeat } = req.body
    try {
        const user = await UserSchema.findById(id)
        const passwordCheck = await bcrypt.compare(oldPassword, user.password)
        if (!passwordCheck) {
            return res.status(406).json({message: 'Girmiş olduğunuz şifre hatalıdır.'})
        }

        if (password !== passwordRepeat) {
            return res.status(406).json({message: 'Şifreler birbiriyle uyuşmuyor.'})
        }
        const passwordHash = await bcrypt.hash(password, 12)

        const updateUser = await UserSchema.findByIdAndUpdate( id, { password: passwordHash }, { new: true } )
        updateUser.password = ''

        res.status(200).json({
            status: 'OK',
            user: updateUser
        })

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

module.exports = { register, login, changePassword }