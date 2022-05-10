const { checkUserOwnParkingLot } = require('../controllers/CRUD/parking_lot')

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
    checkAccountOwner: checkAccountOwner,
    checkVehicleOwner: checkVehicleOwner,
    checkParkingLotOwner: checkParkingLotOwner,
}
