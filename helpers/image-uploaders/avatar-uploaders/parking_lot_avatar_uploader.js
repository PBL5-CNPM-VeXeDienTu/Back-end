const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, './public/images/avatars/parking-lot');
    },
    filename: function (request, file, cb) {
        cb(null, request.body.id + path.extname(file.originalname));
    },
});

const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported files'), false);
    }
};

const uploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
}).single('parking-lot-avatar');

module.exports = uploader;
