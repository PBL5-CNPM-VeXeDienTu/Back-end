const validators = require(process.cwd() + '/helpers/validators')

const {
    getListParkingLots,
    getListParkingLotsByOwnerId,
    getParkingLotById,
    addNewParkingLot,
    updateParkingLotById,
    softDeleteParkingLotById,
} = require('../CRUD/parking_lot')
const { addNewVerifyState } = require('../CRUD/verify_state')

async function index(request, response) {
    try {
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)

        if (
            Number.isNaN(page) ||
            page < 1 ||
            Number.isNaN(limit) ||
            limit < 0
        ) {
            return response.status(400).json({
                message: 'Invalid query parameters!',
            })
        }

        const startIndex = (page - 1) * limit

        const queryResult = await getListParkingLots(startIndex, limit)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByOwnerId(request, response) {
    try {
        const ownerId = request.params.id

        // Get all vehicles that user own
        const dbVehicles = await getListParkingLotsByOwnerId(ownerId)

        return response.status(200).json(dbVehicles)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const vehicleId = request.params.id

        const dbVehicle = getParkingLotById(vehicleId)

        return response.status(200).json(dbVehicle)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const newParkingLot = {
            name: request.body.name,
            address: request.body.address,
            avatar: '',
            time_slot: request.body.time_slot,
            capacity: request.body.capacity,
            is_open: false,
            is_full: false,
            owner_id: request.userData.userId,
            verify_state_id: null,
            deletedAt: null,
        }

        // Validate new vehicle's data
        const validateResponse = validators.validateParkingLot(newParkingLot)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        // Create new verify state for this vehicle
        const newVerifyState = {
            state: 'Đang chờ xử lý',
            note: '',
        }
        addNewVerifyState(newVerifyState).then((result) => {
            newParkingLot.verify_state_id = result.id
        })

        // Create new vehicle
        addNewParkingLot(newParkingLot).then((_) => {
            return response.status(201).json({
                message: 'Create parking lot successfully!',
            })
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        // Check if vehicle exists
        const parkingLotId = request.params.id
        const dbParkingLot = await getParkingLotById(parkingLotId)
        if (dbParkingLot) {
            const updateParkingLot = {
                name: request.body.name,
                address: request.body.address,
                time_slot: request.body.time_slot,
                capacity: request.body.capacity,
                is_open: request.body.is_open,
                is_full: request.body.is_full,
            }

            // Validate update vehicle's data
            const validateResponse =
                validators.validateParkingLot(updateParkingLot)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update vehicle's data
            updateParkingLotById(updateParkingLot, dbParkingLot.id)
        } else {
            return response.status(404).json({
                message: 'Parking lot not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function softDeleteById(request, response) {
    try {
        const parkingLotId = request.params.id

        // Check if vehicle exists
        const dbParkingLot = await getParkingLotById(parkingLotId)
        if (dbParkingLot) {
            // Soft delete vehicle
            softDeleteParkingLotById(dbParkingLot.id)

            return response.status(200).json({
                message: 'Delete parking lot successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Parking lot not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    index: index,
    indexByOwnerId: indexByOwnerId,
    showById: showById,
    create: create,
    updateById: updateById,
    softDeleteById: softDeleteById,
}
