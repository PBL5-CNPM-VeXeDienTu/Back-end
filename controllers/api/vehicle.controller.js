const validators = require(process.cwd() + '/helpers/validators')

const {
    getListVehicles,
    getListVehiclesByOwnerId,
    getVehicleById,
    getVehicleByLicensePlate,
    addNewVehicle,
    updateVehicleById,
    softDeleteVehicleById,
} = require('../CRUD/vehicle')
const { addNewVerifyState } = require('../CRUD/verify_state')

async function index(request, respond) {
    try {
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)

        if (
            Number.isNaN(page) ||
            page < 1 ||
            Number.isNaN(limit) ||
            limit < 0
        ) {
            return respond.status(400).json({
                message: 'Invalid query parameters!',
            })
        }

        const startIndex = (page - 1) * limit

        const queryResult = await getListVehicles(startIndex, limit)

        return respond.status(200).json(queryResult)
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByOwnerId(request, respond) {
    try {
        const ownerId = request.params.id

        // Get all vehicles that user own
        const dbVehicles = await getListVehiclesByOwnerId(ownerId)

        return respond.status(200).json(dbVehicles)
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, respond) {
    try {
        const vehicleId = request.params.id

        const dbVehicle = getVehicleById(vehicleId)

        return respond.status(200).json(dbVehicle)
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, respond) {
    try {
        // Check if vehicle existed
        const dbVehicle = await getVehicleByLicensePlate(
            request.body.license_plate,
        )
        if (dbVehicle) {
            // Check if vehicle has owner id
            if (dbVehicle.owner_id) {
                return respond.status(400).json({
                    message: 'This vehicle already has owner!',
                })
            }
        }

        const newVehicle = {
            license_plate: request.body.license_plate,
            avatar: '',
            cavet_back: '',
            cavet_front: '',
            type: request.body.type,
            color: request.body.color,
            detail: request.body.detail,
            owner_id: request.userData.userId,
            verify_state_id: null,
            deletedAt: null,
        }

        // Validate new vehicle's data
        const validateResponse = validators.validateVehicle(newVehicle)
        if (validateResponse !== true) {
            return respond.status(400).json({
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
            newVehicle.verify_state_id = result.id
        })

        // Create new vehicle
        addNewVehicle(newVehicle).then((_) => {
            return respond.status(201).json({
                message: 'Create vehicle successfully!',
            })
        })
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, respond) {
    try {
        // Check if vehicle exists
        const vehicleId = request.params.id
        const dbVehicle = await getVehicleById(vehicleId)
        if (dbVehicle) {
            const updateVehicle = {
                type: request.body.type,
                color: request.body.color,
                detail: request.body.detail,
            }

            // Validate update vehicle's data
            const validateResponse = validators.validateVehicle(updateVehicle)
            if (validateResponse !== true) {
                return respond.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update vehicle's data
            updateVehicleById(updateVehicle, dbVehicle.id)
        } else {
            return respond.status(404).json({
                message: 'Vehicle not found!',
            })
        }
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function softDeleteById(request, respond) {
    try {
        const vehicleId = request.params.id

        // Check if vehicle exists
        const dbVehicle = await getUserById(vehicleId)
        if (dbVehicle) {
            // Soft delete vehicle
            softDeleteVehicleById(vehicleId.id)

            return respond.status(200).json({
                message: 'Delete vehicle successfully!',
            })
        } else {
            return respond.status(404).json({
                message: 'Vehicle not found!',
            })
        }
    } catch (error) {
        return respond.status(500).json({
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
