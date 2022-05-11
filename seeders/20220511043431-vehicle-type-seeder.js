'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'VehicleTypes',
            [
                {
                    type_name: 'Car',
                },
                {
                    type_name: 'Motobike',
                },
                {
                    type_name: 'Electric bicycle',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('VehicleTypes', null, {})
    },
}
