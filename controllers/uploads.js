const photoUpload = (req, res) => {
    if (req.file) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json(imageUrl);
    } else {
        res.status(400).json({ error: 'Dosya yüklenemedi.' });
    }
}

module.exports = { photoUpload }