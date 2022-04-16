'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Roles',
            [
                {
                    name: 'Basic User',
                },
                {
                    name: 'Parking-lot User',
                },
                {
                    name: 'Admin',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Roles', null, {})
    },
}
