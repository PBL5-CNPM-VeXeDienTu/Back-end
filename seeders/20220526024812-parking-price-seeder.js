'use strict'

async function generateParkingPriceData() {
    let data = []

    const minParkingLotId = 1,
        maxParkingLotId = 6
    const minVehicleTypeId = 1,
        maxVehicleTypeId = 3

    for (
        let parkingLotId = minParkingLotId;
        parkingLotId <= maxParkingLotId;
        parkingLotId++
    ) {
        for (
            let vehicleTypeId = minVehicleTypeId;
            vehicleTypeId <= maxVehicleTypeId;
            vehicleTypeId++
        ) {
            let parkingPrice = {
                parking_lot_id: parkingLotId,
                vehicle_type_id: vehicleTypeId,
                price: Math.floor(Math.random() * 3 + 1) * 1000,
            }

            data.push(parkingPrice)
        }
    }

    return data
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'ParkingPrices',
            await generateParkingPriceData(),
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('ParkingPrices', null, {})
    },
}
