const userAvatarUploader = require('./avatar-uploaders/user_avatar_uploader');
const vehicleAvatarUploader = require('./avatar-uploaders/vehicle_avatar_uploader');
const parkingLotAvatarUploader = require('./avatar-uploaders/parking_lot_avatar_uploader');
const cavetImageBackUploader = require('./cavet-image-uploaders/cavet_image_back_uploader');
const cavetImageFrontUploader = require('./cavet-image-uploaders/cavet_image_front_uploader');

module.exports = {
    userAvatarUploader: userAvatarUploader,
    vehicleAvatarUploader: vehicleAvatarUploader,
    parkingLotAvatarUploader: parkingLotAvatarUploader,
    cavetImageBackUploader: cavetImageBackUploader,
    cavetImageFrontUploader: cavetImageFrontUploader,
};
