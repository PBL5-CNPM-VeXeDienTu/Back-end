const user = require('./user');
const userInfo = require('./user_info');
const userPackage = require('./user_package');
const parkingLot = require('./parking_lot');
const parkingHistory = require('./parking_history');
const parkingPrice = require('./parking_price');
const package = require('./package');
const packageType  = require('./package_type ');
const notification = require('./notification');
const vehicle = require('./vehicle');
const verifyState = require('./verify_state');
const wallet = require('./wallet');
const transaction = require('./transaction');
const transactionType = require('./transaction_type');
const feature = require('./feature');
const feedback = require('./feedback');
const feedbackType = require('./feedback_type');


module.exports = {
    user: user,
    userInfo: userInfo,
    userPackage: userPackage,
    parkingLot: parkingLot,
    parkingHistory: parkingHistory,
    parkingPrice: parkingPrice,
    package: package,
    packageType: packageType,
    notification: notification,
    vehicle: vehicle,
    verifyState: verifyState,
    wallet: wallet,
    feedback: feedback,
    feedbackType: feedbackType,
    transaction: transaction,
    transactionType: transactionType,
    feature: feature,
}





