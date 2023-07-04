const PostSchema = require('../models/post')

const getPosts = async (req, res) => {
    const { search } = req.query
    try {
        let posts
        const totalCount = await PostSchema.countDocuments()
        if (search) {
            const query = {}
            query.title = { $regex: search, $options: 'i' }
            posts = await PostSchema.find(query).sort({ _id: -1 })
            if (posts.length === 0) {
                return res.status(404).json({ message: 'Gönderi bulunamadı.' });
            }
        } else {
            posts = await PostSchema.find().sort({ _id: -1 })
        }
        res.status(200).json({
            status: 'OK',
            totalCount,
            posts
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getPostDetails = async (req, res) => {
    const { id } = req.params
    try {
        const post = await PostSchema.findById(id)
        res.status(200).json({
            status: 'OK',
            post
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getPostBySlug = async (req, res) => {
    const { slug } = req.params
    try {
        const post = await PostSchema.findOne({ slug: slug })
        res.status(200).json({
            status: 'OK',
            post
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createPost = async (req, res) => {
    try {
        const newPost = await PostSchema.create(req.body)
        res.status(200).json({
            status: 'OK',
            newPost
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params
    try {
        const updatedPost = await PostSchema.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({
            status: 'OK',
            updatedPost
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params
    try {
        await PostSchema.findByIdAndRemove(id)
        res.status(200).json({
            status: 'OK',
            message: 'Gönderi başarıyla silindi.'
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getPosts, getPostDetails, getPostBySlug, createPost, updatePost, deletePost }