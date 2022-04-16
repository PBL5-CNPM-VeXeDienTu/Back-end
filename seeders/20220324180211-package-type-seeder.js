'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'PackageTypes',
            [
                {
                    type_name: 'Week',
                },
                {
                    type_name: 'Month',
                },
                {
                    type_name: 'Quarter',
                },
                {
                    type_name: 'Year',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('PackageTypes', null, {})
    },
}
