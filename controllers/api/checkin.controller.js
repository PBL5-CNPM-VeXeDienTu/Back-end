const uuid = require('uuid')

const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')
const validators = require(process.cwd() + '/helpers/validators')

const { getVehicleByLicensePlate } = require('../CRUD/vehicle')
const {
    getParkingHistoryByParams,
    addNewParkingHistory,
} = require('../CRUD/parking_history')
const {
    getParkingPriceByParkingLotIdAndVehicleTypeId,
} = require('../CRUD/parking_price')

async function checkin(request, response) {
    try {
        const parkingLotId = request.body.parking_lot_id
        const licensePlate = request.body.license_plate

        // Check parking state of vehicle
        const params = {
            is_parking: true,
            license_plate: licensePlate,
        }
        const dbParkingHistory = await getParkingHistoryByParams(params)
        if (dbParkingHistory) {
            return response.status(400).json({
                message: 'This vehicle is already parking!',
            })
        }

        const dbVehicle = await getVehicleByLicensePlate(licensePlate)
        if (dbVehicle) {
            // Check if parking lot have parking price for this vehicle type
            const dbParkingPrice =
                await getParkingPriceByParkingLotIdAndVehicleTypeId(
                    parkingLotId,
                    dbVehicle.type_id,
                )
            if (!dbParkingPrice) {
                return response.status(400).json({
                    message:
                        'Parking lot have no parking price for this vehicle type!',
                })
            }

            const newParkingHistory = {
                user_id: dbVehicle.owner_id,
                vehicle_id: dbVehicle.id,
                parking_lot_id: parkingLotId,
                checkin_time: getCurrentDateTime(),
                checkout_time: null,
                is_parking: true,
                memo: null,
                cost: null,
                qr_key: uuid.v1(),
            }

            // Validate new parking history's data
            const validateResponse =
                validators.validateParkingHistory(newParkingHistory)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            addNewParkingHistory(newParkingHistory).then((_) => {
                return response.status(200).json({
                    message: 'Checkin successfully! Parking history created!',
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

module.exports = {
    checkin: checkin,
}
