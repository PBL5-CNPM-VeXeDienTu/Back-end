'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Wallets',
            [
                {
                    user_id: 6,
                    balance: 100000,
                },
                {
                    user_id: 7,
                    balance: 700000,
                },
                {
                    user_id: 8,
                    balance: 150000,
                },
                {
                    user_id: 9,
                    balance: 100000,
                },
                {
                    user_id: 10,
                    balance: 100000,
                },
                {
                    user_id: 11,
                    balance: 100000,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Wallets', null, {
            [Op.or]: [{ role: 1 }, { role: 2 }],
        })
    },
}
