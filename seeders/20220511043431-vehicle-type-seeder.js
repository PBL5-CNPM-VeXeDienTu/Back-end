'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'VehicleTypes',
            [
                {
                    type_name: 'Electric bicycle',
                },
                {
                    type_name: 'Motobike',
                },
                {
                    type_name: 'Car',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('VehicleTypes', null, {})
    },
}
