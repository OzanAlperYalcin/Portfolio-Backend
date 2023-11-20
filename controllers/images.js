const fs = require('fs');
const path = require('path');

const getImages = (_, res) => {
    const directoryPath = path.join(__dirname, '../uploads/')
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Dosyalar listelenirken hata oluştu.' });
        }
        const imageList = files.map(file => ({
            name: file,
            url: `/uploads/${file}`
        }));
        res.json(imageList);
    });
}

const deleteImage = (req, res) => {
    const { fileName } = req.params
    const filePath = path.join(__dirname, "../uploads/", fileName)
    fs.unlink(filePath, async (err) => {
        if (err) {
            return res.status(500).json({ error: "Dosya bulunamadı veya silinemedi." });
        } else {
            try {
                return res.status(200).json({ message: "Dosya başarıyla silindi." });
            } catch (err) {
                return res.status(500).json({ message: err.message })
            }
        }
    })
}

module.exports = { getImages, deleteImage }