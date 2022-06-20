'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Transactions',
            [
                {
                    wallet_id: 1,
                    old_balance: 0,
                    amount: 100000,
                    new_balance: 100000,
                    type_id: 1,
                    reference_id: 1,
                },
                {
                    wallet_id: 2,
                    old_balance: 0,
                    amount: 700000,
                    new_balance: 700000,
                    type_id: 1,
                    reference_id: 2,
                },
                {
                    wallet_id: 3,
                    old_balance: 0,
                    amount: 150000,
                    new_balance: 150000,
                    type_id: 1,
                    reference_id: 3,
                },
                {
                    wallet_id: 4,
                    old_balance: 0,
                    amount: 100000,
                    new_balance: 100000,
                    type_id: 1,
                    reference_id: 4,
                },
                {
                    wallet_id: 5,
                    old_balance: 0,
                    amount: 100000,
                    new_balance: 100000,
                    type_id: 1,
                    reference_id: 5,
                },
                {
                    wallet_id: 6,
                    old_balance: 0,
                    amount: 100000,
                    new_balance: 100000,
                    type_id: 1,
                    reference_id: 6,
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
