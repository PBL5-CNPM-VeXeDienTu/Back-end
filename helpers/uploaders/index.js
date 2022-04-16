const userAvatarUploader = require('./avatar/user_avatar.uploader')
const vehicleAvatarUploader = require('./avatar/vehicle_avatar.uploader')
const parkingLotAvatarUploader = require('./avatar/parking_lot_avatar.uploader')
const cavetBackUploader = require('./cavet/cavet_back.uploader')
const cavetFrontUploader = require('./cavet/cavet_front.uploader')

module.exports = {
    userAvatarUploader: userAvatarUploader,
    vehicleAvatarUploader: vehicleAvatarUploader,
    parkingLotAvatarUploader: parkingLotAvatarUploader,
    cavetBackUploader: cavetBackUploader,
    cavetFrontUploader: cavetFrontUploader,
}
