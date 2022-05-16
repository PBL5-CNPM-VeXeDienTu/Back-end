const { checkUserOwnWallet } = require('../controllers/CRUD/wallet')
const { checkUserOwnParkingLot } = require('../controllers/CRUD/parking_lot')
const { checkUserOwnVehicle } = require('../controllers/CRUD/vehicle')

const ADMIN_ROLE = 3

async function checkRoleAdmin(request, response, next) {
    try {
        const requestRole = request.userData.role

        // Check if request user is admin or not
        if (requestRole != ADMIN_ROLE) {
            return response.status(400).json({
                message: 'Invalid role!',
            })
        } else next()
    } catch (error) {
        return response.status(401).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

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
                    message: 'Invalid role!',
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

module.exports = {
    checkRoleAdmin: checkRoleAdmin,
    checkAccountOwner: checkAccountOwner,
    checkWalletOwner: checkWalletOwner,
    checkVehicleOwner: checkVehicleOwner,
    checkParkingLotOwner: checkParkingLotOwner,
}
