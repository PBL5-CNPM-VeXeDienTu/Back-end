const userAvatarController = require('./avatar/user_avatar.controller')
const vehicleAvatarController = require('./avatar/vehicle_avatar.controller')
const parkingLotAvatarController = require('./avatar/parking_lot_avatar.controller')
const cavetBackController = require('./cavet/cavet_back.controller')
const cavetFrontController = require('./cavet/cavet_front.controller')

module.exports = {
    userAvatarController: userAvatarController,
    vehicleAvatarController: vehicleAvatarController,
    parkingLotAvatarController: parkingLotAvatarController,
    cavetBackController: cavetBackController,
    cavetFrontController: cavetFrontController,
}
