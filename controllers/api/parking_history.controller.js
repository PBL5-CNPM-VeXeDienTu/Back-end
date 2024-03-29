const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require('../../helpers/datetime')

const {
    getListParkingHistories,
    getListParkingHistoriesByUserId,
    getParkingHistoryById,
    updateParkingHistoryById,
    deleteParkingHistoryById,
} = require('../CRUD/parking_history')
const { checkUserOwnParkingLot } = require('../CRUD/parking_lot')

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

        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            is_parking: request.query.is_parking,
            checkin_from_date: request.query.checkin_from_date
                ? request.query.checkin_from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            checkin_to_date: request.query.checkin_to_date
                ? request.query.checkin_to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
            checkout_from_date: request.query.checkout_from_date
                ? request.query.checkout_from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            checkout_to_date: request.query.checkout_to_date
                ? request.query.checkout_to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const queryResult = await getListParkingHistories(
            startIndex,
            limit,
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

async function indexByUserId(request, response) {
    try {
        const userId = request.params.id
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)

        const startIndex = (page - 1) * limit

        const parkingLotId = request.query.parking_lot_id

        if (parkingLotId) {
            const isOwner = await checkUserOwnParkingLot(
                Number.parseInt(parkingLotId),
                userId,
            )
            if (!isOwner) {
                return response.status(400).json({
                    message: 'User is not the owner of this parking lot!',
                })
            }
        }

        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            is_parking: request.query.is_parking,
            checkin_from_date: request.query.checkin_from_date
                ? request.query.checkin_from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            checkin_to_date: request.query.checkin_to_date
                ? request.query.checkin_to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
            checkout_from_date: request.query.checkout_from_date
                ? request.query.checkout_from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            checkout_to_date: request.query.checkout_to_date
                ? request.query.checkout_to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
            role: request.userData.role,
            parking_lot_id: parkingLotId,
        }

        const queryResult = await getListParkingHistoriesByUserId(
            userId,
            startIndex,
            limit,
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

            // Validate update parking history's data
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
                return response.status(200).json({
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
