const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListParkingLots,
    getListParkingLotsByOwnerId,
    getParkingLotById,
    addNewParkingLot,
    updateParkingLotById,
    softDeleteParkingLotById,
} = require('../CRUD/parking_lot')
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
            verify_state: request.query.verify_state
                ? request.query.verify_state.trim()
                : '',
            is_open: request.query.is_open,
            is_full: request.query.is_full,
            from_date: request.query.from_date
                ? request.query.from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            to_date: request.query.to_date
                ? request.query.to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const queryResult = await getListParkingLots(
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

        // Get all paring lots that user own
        const dbParkingLots = await getListParkingLotsByOwnerId(
            ownerId,
            userRole === ADMIN_ROLE,
        )

        return response.status(200).json(dbParkingLots)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const parkingLotId = request.params.id

        const dbParkingLot = await getParkingLotById(parkingLotId)

        const userRole = request.userData.role
        if (userRole !== ADMIN_ROLE && dbParkingLot?.deletedAt !== null) {
            return response.status(401).json({
                message: 'This parking lot has been deleted!',
            })
        }

        return response.status(200).json(dbParkingLot)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        let newParkingLot = {
            name: request.body.name,
            address: request.body.address,
            avatar: 'public/images/avatars/parking-lot/default-avatar.png',
            time_slot: request.body.time_slot,
            capacity: request.body.capacity,
            is_open: false,
            is_full: false,
            owner_id: request.userData.userId,
            verify_state_id: null,
            deletedAt: null,
        }

        // Validate new parking lot's data
        const validateResponse = validators.validateParkingLot(newParkingLot)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        // Create new verify state for this parking lot
        const newVerifyState = {
            state: 'Đang chờ xử lý',
            note: '',
        }
        await addNewVerifyState(newVerifyState).then((result) => {
            newParkingLot.verify_state_id = result.id
        })

        // Create new parking lot
        addNewParkingLot(newParkingLot).then((result) => {
            return response.status(200).json({
                parkingLotId: result.id,
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
        const parkingLotId = request.params.id

        // Check if parking lot exists
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

            // Validate update parking lot's data
            const validateResponse =
                validators.validateParkingLot(updateParkingLot)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update parking lot's data
            updateParkingLotById(updateParkingLot, dbParkingLot.id).then(
                (_) => {
                    return response.status(200).json({
                        message: 'Update parking lot successfully!',
                    })
                },
            )
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

async function verifyById(request, response) {
    try {
        const parkingLotId = request.params.id

        // Check if parking lot exists
        const dbParkingLot = await getParkingLotById(parkingLotId)
        if (dbParkingLot) {
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

            // Update parking lot's data
            updateVerifyStateById(
                updateVerifyState,
                dbParkingLot.verify_state_id,
            ).then((_) => {
                return response.status(200).json({
                    message: 'Update verify state successfully!',
                })
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

async function softDeleteById(request, response) {
    try {
        const parkingLotId = request.params.id

        // Check if parking lot exists
        const dbParkingLot = await getParkingLotById(parkingLotId)
        if (dbParkingLot) {
            // Soft delete parking lot
            await softDeleteParkingLotById(dbParkingLot.id)

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
    verifyById: verifyById,
    softDeleteById: softDeleteById,
}
