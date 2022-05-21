const auth = require('./auth.route')
const upload = require('./upload.route')
const user = require('./user.route')
const wallet = require('./wallet.route')
const vehicle = require('./vehicle.route')
const parkingLot = require('./parking_lot.route')
const parkingPrice = require('./parking_price.route')
const package = require('./package.route')
const parkingHistory = require('./parking_history.route')
const userPackage = require('./user_package.route')
const feedback = require('./feedback.route')

module.exports = {
    auth: auth,
    upload: upload,
    user: user,
    wallet: wallet,
    vehicle: vehicle,
    parkingLot: parkingLot,
    parkingPrice: parkingPrice,
    package: package,
    parkingHistory: parkingHistory,
    userPackage: userPackage,
    feedback: feedback,
}
