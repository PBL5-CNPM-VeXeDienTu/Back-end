'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Transactions',
            [
                {
                    wallet_id: 1,
                    type_id: 1,
                    reference_id: 1,
                    amount: 100000,
                },
                {
                    wallet_id: 2,
                    type_id: 1,
                    reference_id: 2,
                    amount: 700000,
                },
                {
                    wallet_id: 3,
                    type_id: 1,
                    reference_id: 3,
                    amount: 150000,
                },
                {
                    wallet_id: 4,
                    type_id: 1,
                    reference_id: 4,
                    amount: 100000,
                },
                {
                    wallet_id: 5,
                    type_id: 1,
                    reference_id: 5,
                    amount: 100000,
                },
                {
                    wallet_id: 6,
                    type_id: 1,
                    reference_id: 6,
                    amount: 100000,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Transactions', null, {
            [Op.or]: [{ role: 1 }, { role: 2 }],
        })
    },
}
