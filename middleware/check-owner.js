const { checkUserOwnWallet } = require('../controllers/CRUD/wallet')
const { checkUserOwnParkingLot } = require('../controllers/CRUD/parking_lot')
const { checkUserOwnVehicle } = require('../controllers/CRUD/vehicle')
const {
    checkUserOwnParkingPrice,
} = require('../controllers/CRUD/parking_price')
const { checkUserOwnPackage } = require('../controllers/CRUD/package')
const { checkUserOwnUserPackage } = require('../controllers/CRUD/user_package')
const { checkUserOwnFeedback } = require('../controllers/CRUD/feedback')

const ADMIN_ROLE = 3

async function checkAccountOwner(request, response, next) {
    try {
        const userId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            // If API don't have id then this API is for admin only
            if (!userId) {
                return response.status(400).json({
                    message: 'Invalid role!',
                })
            }

            if (requestUserId != userId) {
                return response.status(400).json({
                    message: 'Access denied for this role!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkWalletOwner(request, response, next) {
    try {
        const walletId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnWallet(walletId, requestUserId)
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this wallet!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkVehicleOwner(request, response, next) {
    try {
        const vehicleId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnVehicle(vehicleId, requestUserId)
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this vehicle!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkParkingLotOwner(request, response, next) {
    try {
        const parkingLotId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnParkingLot(
                parkingLotId,
                requestUserId,
            )
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this parking lot!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkParkingPriceOwner(request, response, next) {
    try {
        const parkingPriceId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnParkingPrice(
                parkingPriceId,
                requestUserId,
            )
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this parking price!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkPackageOwner(request, response, next) {
    try {
        const packageId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnPackage(packageId, requestUserId)
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this package!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkUserPackageOwner(request, response, next) {
    try {
        const userPackageOwnerId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnUserPackage(
                userPackageOwnerId,
                requestUserId,
            )
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this parking price!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function checkFeedbackOwner(request, response, next) {
    try {
        const feedbackId = request.params.id
        const requestRole = request.userData.role
        const requestUserId = request.userData.userId

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            const isOwner = await checkUserOwnFeedback(
                feedbackId,
                requestUserId,
            )
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this feedback!',
                })
            } else next()
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    checkAccountOwner: checkAccountOwner,
    checkWalletOwner: checkWalletOwner,
    checkVehicleOwner: checkVehicleOwner,
    checkParkingLotOwner: checkParkingLotOwner,
    checkParkingPriceOwner: checkParkingPriceOwner,
    checkPackageOwner: checkPackageOwner,
    checkUserPackageOwner: checkUserPackageOwner,
    checkFeedbackOwner: checkFeedbackOwner,
}
