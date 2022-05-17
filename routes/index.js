const auth = require('./auth.route')
const upload = require('./upload.route')
const user = require('./user.route')
const vehicle = require('./vehicle.route')
const parkingLot = require('./parking_lot.route')
const parkingPrice = require('./parking_price.route')
const wallet = require('./wallet.route')

module.exports = {
    auth: auth,
    upload: upload,
    user: user,
    wallet: wallet,
    vehicle: vehicle,
    parkingLot: parkingLot,
    parkingPrice: parkingPrice,
}
