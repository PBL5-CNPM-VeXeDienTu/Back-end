'use strict'

const Dummy = require('dummyjs')

const { getVehicleById } = require('../controllers/CRUD/vehicle')
const {
    getParkingPriceByParkingLotIdAndVehicleTypeId,
} = require('../controllers/CRUD/parking_price')

const vehicleIds = [
    [1, 2], // Parking user 1's vehicles
    [3, 4, 5], // Parking user 2's vehicles
    [6, 7, 8], // Parking user 3's vehicles
]

const PAY_PARKING_FEE_TRANSACTION_TYPE_ID = 4

async function randomDate() {
    let start = new Date(2022, 0, 1)
    let end = new Date()
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )
}

async function generateParkingHistoryData() {
    let data = []

    const minParkingUserId = 6,
        maxParkingUserId = 8
    const minParkingLotId = 1,
        maxParkingLotId = 6

    for (let i = 0; i < 50; i++) {
        let userId = Math.floor(
            Math.random() * (maxParkingUserId - minParkingUserId + 1) +
                minParkingUserId,
        )
        let vehicleId =
            vehicleIds[userId - minParkingUserId][
                Math.floor(
                    Math.random() *
                        (vehicleIds[userId - minParkingUserId].length - 1),
                )
            ]
        let parkingLotId = Math.floor(
            Math.random() * (maxParkingLotId - minParkingLotId + 1) +
                minParkingLotId,
        )
        let checkinTime = await randomDate()
        let checkoutTime = new Date(checkinTime.getTime() + 5 * 60 * 60 * 1000) // Add 5 more hours
        let vehicleTypeId = (await getVehicleById(vehicleId))?.type_id
        let parkingPrice = (
            await getParkingPriceByParkingLotIdAndVehicleTypeId(
                parkingLotId,
                vehicleTypeId,
            )
        )?.price

        let parkingHistory = {
            user_id: userId,
            vehicle_id: vehicleId,
            parking_lot_id: parkingLotId,
            checkin_time: checkinTime,
            checkout_time: checkoutTime,
            is_parking: false,
            memo: Dummy.text(10),
            cost: parkingPrice,
            qr_key: Dummy.text(5),
        }

        data.push(parkingHistory)
    }

    return data
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'ParkingHistories',
            await generateParkingHistoryData(),
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ParkingHistories', null, {})
    },
}
