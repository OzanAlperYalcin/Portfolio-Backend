const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Yüklenen dosyaların saklanacağı dizin
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Dosya adı formatı
    },
});

const upload = multer({ storage });

module.exports = upload