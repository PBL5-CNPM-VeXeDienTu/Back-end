const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListVehicles,
    getListVehiclesByOwnerId,
    getVehicleById,
    getVehicleByLicensePlate,
    addNewVehicle,
    updateVehicleById,
    softDeleteVehicleById,
} = require('../CRUD/vehicle')
const {
    addNewVerifyState,
    updateVerifyStateById,
} = require('../CRUD/verify_state')

const ADMIN_ROLE = 3

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
        const userRole = request.userData.role
        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            type_id: request.query.type_id,
            verify_state: request.query.verify_state
                ? request.query.verify_state.trim()
                : '',
            from_date: request.query.from_date
                ? request.query.from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            to_date: request.query.to_date
                ? request.query.to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const queryResult = await getListVehicles(
            startIndex,
            limit,
            userRole === ADMIN_ROLE,
            params,
        )

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
        const userRole = request.userData.role

        // Get all vehicles that user own
        let dbVehicles
        if (userRole !== ADMIN_ROLE) {
            dbVehicles = await getListVehiclesByOwnerId(ownerId, !ADMIN_ROLE)
        } else {
            dbVehicles = await getListVehiclesByOwnerId(ownerId, ADMIN_ROLE)
        }

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

        const userRole = request.userData.role
        if (userRole !== ADMIN_ROLE && dbVehicle?.deletedAt !== null) {
            return response.status(401).json({
                message: 'This vehicle has been deleted!',
            })
        }

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

async function verifyById(request, response) {
    try {
        const vehicleId = request.params.id

        // Check if vehicle exists
        const dbVehicle = await getVehicleById(vehicleId)
        if (dbVehicle) {
            const updateVerifyState = {
                state: request.body.state,
                note: request.body.note,
            }

            // Validate update verify state's data
            const validateResponse =
                validators.validateVerifyState(updateVerifyState)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update verify state's data
            updateVerifyStateById(
                updateVerifyState,
                dbVehicle.verify_state_id,
            ).then((_) => {
                return response.status(201).json({
                    message: 'Update verify state successfully!',
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
            await softDeleteVehicleById(dbVehicle.id)

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
    verifyById: verifyById,
    softDeleteById: softDeleteById,
}
