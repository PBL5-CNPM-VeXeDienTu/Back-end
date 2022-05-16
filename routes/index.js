const auth = require('./auth.route')
const upload = require('./upload.route')
const user = require('./user.route')
const vehicle = require('./vehicle.route')
const parkingLot = require('./parking_lot.route')
const wallet = require('./wallet.route')

module.exports = {
    auth: auth,
    upload: upload,
    user: user,
    vehicle: vehicle,
    parkingLot: parkingLot,
    wallet: wallet,
}
