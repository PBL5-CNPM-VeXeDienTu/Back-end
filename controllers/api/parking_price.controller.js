const validators = require(process.cwd() + '/helpers/validators')

const {
    getParkingPricesByParkingLotId,
    getParkingPriceById,
    getParkingPriceByParkingLotIdAndVehicleTypeId,
    addNewParkingPrice,
    updateParkingPriceById,
    deleteParkingPriceById,
} = require('../CRUD/parking_price')

async function indexByParkingLotId(request, response) {
    try {
        const parkingLotId = request.params.id

        const queryResult = await getParkingPricesByParkingLotId(parkingLotId)

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
        const parkingPriceId = request.params.id

        const dbParkingPrice = await getParkingPriceById(parkingPriceId)

        return response.status(200).json(dbParkingPrice)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const newParkingPrice = {
            parking_lot_id: request.userData.userId,
            vehicle_type_id: request.body.vehicle_type_id,
            price: request.body.price,
        }

        // Validate new vehicle's data
        const validateResponse =
            validators.validateParkingPrice(newParkingPrice)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        // Check if parking price of that vehicle type exists
        const dbParkingPrice =
            await getParkingPriceByParkingLotIdAndVehicleTypeId(
                newParkingPrice.parking_lot_id,
                newParkingPrice.vehicle_type_id,
            )
        if (dbParkingPrice) {
            updateParkingPriceById(
                dbParkingPrice.id,
                newParkingPrice.price,
            ).then((_) => {
                return response.status(404).json({
                    message:
                        'Price for this type of vehicle is already exist! Update price successfully!',
                })
            })
        } else {
            addNewParkingPrice(newParkingPrice).then((_) => {
                return response.status(404).json({
                    message: 'Create parking price successfully!',
                })
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const parkingPriceId = request.params.id

        // Check if vehicle exists
        const dbParkingPrice = await getParkingPriceById(parkingPriceId)
        if (dbParkingPrice) {
            const updateParkingPrice = {
                parking_lot_id: request.userData.userId,
                vehicle_type_id: request.body.vehicle_type_id,
                price: request.body.price,
            }

            // Validate update vehicle's data
            const validateResponse =
                validators.validateParkingPrice(updateParkingPrice)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update vehicle's data
            updateParkingPriceById(updateParkingPrice, dbParkingPrice.id).then(
                (_) => {
                    return response.status(201).json({
                        message: 'Update parking price successfully!',
                    })
                },
            )
        } else {
            return response.status(404).json({
                message: 'Parking price not found!',
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
        const parkingLotId = request.params.id

        // Check if vehicle exists
        const dbParkingPrice = await getParkingPriceById(parkingLotId)
        if (dbParkingPrice) {
            // Delete parking price
            deleteParkingPriceById(dbParkingPrice.id)

            return response.status(200).json({
                message: 'Delete parking price successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Parking price not found!',
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
    // index: index,
    indexByParkingLotId: indexByParkingLotId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
