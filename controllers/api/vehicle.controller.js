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

        const queryResult = await getListVehicles(startIndex, limit)

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
        const dbVehicles = await getListVehiclesByOwnerId(ownerId)

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

        const dbVehicle = await getVehicleById(vehicleId)

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
        // Check if vehicle existed
        const dbVehicle = await getVehicleByLicensePlate(
            request.body.license_plate,
        )
        if (dbVehicle) {
            // Check if vehicle has owner id
            if (dbVehicle.owner_id) {
                return response.status(400).json({
                    message: 'This vehicle already has owner!',
                })
            }
        }

        let newVehicle = {
            license_plate: request.body.license_plate,
            avatar: 'public/images/avatars/vehicle/default-avatar.png',
            cavet_back: 'public/images/cavet/default.png',
            cavet_front: 'public/images/cavet/default.png',
            type_id: request.body.type_id,
            brand: request.body.brand,
            color: request.body.color,
            detail: request.body.detail,
            owner_id: request.userData.userId,
            verify_state_id: null,
            deletedAt: null,
        }

        // Validate new vehicle's data
        const validateResponse = validators.validateVehicle(newVehicle)
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
        await addNewVerifyState(newVerifyState).then((result) => {
            newVehicle.verify_state_id = result.id
        })

        // Create new vehicle
        addNewVehicle(newVehicle).then((result) => {
            return response.status(201).json({
                vehicleId: result.id,
                message: 'Create vehicle successfully!',
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
        const vehicleId = request.params.id

        // Check if vehicle exists
        const dbVehicle = await getVehicleById(vehicleId)
        if (dbVehicle) {
            const updateVehicle = {
                type_id: request.body.type_id,
                brand: request.body.brand,
                color: request.body.color,
                detail: request.body.detail,
            }

            // Validate update vehicle's data
            const validateResponse = validators.validateVehicle(updateVehicle)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update vehicle's data
            updateVehicleById(updateVehicle, dbVehicle.id).then((_) => {
                return response.status(201).json({
                    message: 'Update vehicle successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Vehicle not found!',
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
        const vehicleId = request.params.id

        // Check if vehicle exists
        const dbVehicle = await getVehicleById(vehicleId)
        if (dbVehicle) {
            // Soft delete vehicle
            softDeleteVehicleById(vehicleId.id)

            return response.status(200).json({
                message: 'Delete vehicle successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Vehicle not found!',
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
