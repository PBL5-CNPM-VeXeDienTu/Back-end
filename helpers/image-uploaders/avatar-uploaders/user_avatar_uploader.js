const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, './public/images/avatars/user');
    },
    filename: function (request, file, cb) {
        cb(null, request.userData.userId + path.extname(file.originalname));
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
}).single('user-avatar');

module.exports = uploader;
