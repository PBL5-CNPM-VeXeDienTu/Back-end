'use strict'

const Dummy = require('dummyjs')

async function generatePackageData() {
    let data = []

    const maxParkingLotId = 6
    const maxTypeId = 4
    const maxVehicleTypeId = 3

    for (
        let parkingLotId = 1;
        parkingLotId <= maxParkingLotId;
        parkingLotId++
    ) {
        for (
            let packageTypeId = 1;
            packageTypeId <= maxTypeId;
            packageTypeId++
        ) {
            for (
                let vehicleTypeId = 1;
                vehicleTypeId <= maxVehicleTypeId;
                vehicleTypeId++
            ) {
                let _package = {
                    parking_lot_id: parkingLotId,
                    name: Dummy.text(10),
                    type_id: packageTypeId,
                    vehicle_type_id: vehicleTypeId,
                    price: Math.floor(Math.random() * 3 + 1) * 10000,
                }

                data.push(_package)
            }
        }
    }

    return data
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Packages', await generatePackageData())
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Packages', null, {})
    },
}
