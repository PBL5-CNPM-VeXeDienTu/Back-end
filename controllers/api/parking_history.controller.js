const validators = require(process.cwd() + '/helpers/validators')

const {
    getListParkingHistories,
    getListParkingHistoriesByUserId,
    getParkingHistoryById,
    updateParkingHistoryById,
    deleteParkingHistoryById,
} = require('../CRUD/parking_history')

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

        const queryResult = await getListParkingHistories(startIndex, limit)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByUserId(request, response) {
    try {
        const userId = request.params.id
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

        const queryResult = await getListParkingHistoriesByUserId(
            userId,
            startIndex,
            limit,
        )

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const parkingHistoryId = request.params.id

        const dbParkingHistory = await getParkingHistoryById(parkingHistoryId)

        return response.status(200).json(dbParkingHistory)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const parkingHistoryId = request.params.id

        // Check if parking history exists
        const dbParkingHistory = await getParkingHistoryById(parkingHistoryId)
        if (dbParkingHistory) {
            const updateParkingHistory = {
                checkin_time: request.body.checkin_time,
                checkout_time: request.body.checkout_time,
                is_parking: request.body.is_parking,
                memo: request.body.memo,
                cost: request.body.cost,
            }

            // Validate update vehicle's data
            const validateResponse =
                validators.validateParkingHistory(updateParkingHistory)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update vehicle's data
            updateParkingHistoryById(
                updateParkingHistory,
                dbParkingHistory.id,
            ).then((_) => {
                return response.status(201).json({
                    message: 'Update parking history successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Parking history not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function deleteById(request, response) {
    try {
        const parkingHistoryId = request.params.id

        // Check if parking history exists
        const dbParkingHistory = await getParkingHistoryById(parkingHistoryId)
        if (dbParkingHistory) {
            deleteParkingHistoryById(dbParkingHistory.id)

            return response.status(200).json({
                message: 'Delete parking history successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Parking history not found!',
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
    indexByUserId: indexByUserId,
    showById: showById,
    updateById: updateById,
    deleteById: deleteById,
}
