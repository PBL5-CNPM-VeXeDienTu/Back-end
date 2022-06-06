'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'TransactionTypes',
            [
                {
                    type_name: 'Nạp tiền vào ví',
                },
                {
                    type_name: 'Rút tiền khỏi ví',
                },
                {
                    type_name: 'Hoàn tiền vào ví',
                },
                {
                    type_name: 'Thanh toán phí gửi xe',
                },
                {
                    type_name: 'Mua gói ưu đãi',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('TransactionTypes', null, {})
    },
}
