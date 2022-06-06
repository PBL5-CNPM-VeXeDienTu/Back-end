const multer = require('multer')
const path = require('path')

const fs = require('fs')
const destination = process.cwd() + '/public/images/avatars/user'

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
}

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, destination)
    },
    filename: function (request, file, cb) {
        cb(null, request.params.id + path.extname(file.originalname))
    },
})

const fileFilter = (request, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Unsupported file type'), false)
    }
}

const uploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
}).single('user-avatar')

module.exports = uploader
