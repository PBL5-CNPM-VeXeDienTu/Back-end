const FastestValidator = require('fastest-validator')
const validator = new FastestValidator()

// Schemas
const schemas = require('./schemas')

// Validate functions
const validateUser = (user) => validator.validate(user, schemas.userSchema)
const validateRole = (role) => validator.validate(role, schemas.roleSchema)
const validateUserInfo = (userInfo) =>
    validator.validate(userInfo, schemas.userInfoSchema)
const validateWallet = (wallet) =>
    validator.validate(wallet, schemas.walletSchema)
const validateTransaction = (transaction) =>
    validator.validate(transaction, schemas.transactionSchema)
const validateTransactionType = (transactionType) =>
    validator.validate(transactionType, schemas.transactionTypeSchema)
const validateVehicle = (vehicle) =>
    validator.validate(vehicle, schemas.vehicleSchema)
const validateVehicleType = (vehicleType) =>
    validator.validate(vehicleType, schemas.vehicleTypeSchema)
const validateParkingLot = (parkingLot) =>
    validator.validate(parkingLot, schemas.parkingLotSchema)
const validateParkingHistory = (parkingHistory) =>
    validator.validate(parkingHistory, schemas.parkingHistorySchema)
const validateVerifyState = (verifyState) =>
    validator.validate(verifyState, schemas.verifyStateSchema)
const validateParkingPrice = (parkingPrice) =>
    validator.validate(parkingPrice, schemas.parkingPriceSchema)
const validatePackage = (package) =>
    validator.validate(package, schemas.packageSchema)
const validatePackageType = (packageType) =>
    validator.validate(packageType, schemas.packageTypeSchema)
const validateUserPackage = (userPackage) =>
    validator.validate(userPackage, schemas.userPackageSchema)
const validateFeedback = (feedback) =>
    validator.validate(feedback, schemas.feedbackSchema)
const validateFeedbackType = (feedbackType) =>
    validator.validate(feedbackType, schemas.feedbackTypeSchema)
const validateFeature = (feature) =>
    validator.validate(feature, schemas.featureSchema)
const validateNotification = (notification) =>
    validator.validate(notification, schemas.notificationSchema)
const validateAuthKey = (authKey) =>
    validator.validate(authKey, schemas.authKeySchema)
const validateQRData = (qrData) =>
    validator.validate(qrData, schemas.qrDataSchema)

module.exports = {
    validateUser: validateUser,
    validateRole: validateRole,
    validateUserInfo: validateUserInfo,
    validateWallet: validateWallet,
    validateTransaction: validateTransaction,
    validateTransactionType: validateTransactionType,
    validateVehicle: validateVehicle,
    validateVehicleType: validateVehicleType,
    validateParkingLot: validateParkingLot,
    validateParkingHistory: validateParkingHistory,
    validateVerifyState: validateVerifyState,
    validateParkingPrice: validateParkingPrice,
    validatePackage: validatePackage,
    validatePackageType: validatePackageType,
    validateUserPackage: validateUserPackage,
    validateFeedback: validateFeedback,
    validateFeedbackType: validateFeedbackType,
    validateFeature: validateFeature,
    validateNotification: validateNotification,
    validateAuthKey: validateAuthKey,
    validateQRData: validateQRData,
}
