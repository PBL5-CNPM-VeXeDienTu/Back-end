const auth = require('./auth.route')
const upload = require('./upload.route')
const user = require('./user.route')
const vehicle = require('./vehicle.route')

module.exports = {
    auth: auth,
    upload: upload,
    user: user,
    vehicle: vehicle,
}
