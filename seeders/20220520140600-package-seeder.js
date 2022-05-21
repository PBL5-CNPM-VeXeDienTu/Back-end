'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Packages', [
            {
                parking_lot_id: 1,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 1,
                vehicle_type_id: 1,
                price: 200000,
            },
            {
                parking_lot_id: 1,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 2,
                vehicle_type_id: 2,
                price: 200000,
            },
            {
                parking_lot_id: 2,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 1,
                vehicle_type_id: 1,
                price: 200000,
            },
            {
                parking_lot_id: 2,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 2,
                vehicle_type_id: 2,
                price: 200000,
            },
            {
                parking_lot_id: 3,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 1,
                vehicle_type_id: 1,
                price: 200000,
            },
            {
                parking_lot_id: 3,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 2,
                vehicle_type_id: 2,
                price: 200000,
            },
            {
                parking_lot_id: 4,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 1,
                vehicle_type_id: 1,
                price: 200000,
            },
            {
                parking_lot_id: 4,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 2,
                vehicle_type_id: 2,
                price: 200000,
            },
            {
                parking_lot_id: 5,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 1,
                vehicle_type_id: 1,
                price: 200000,
            },
            {
                parking_lot_id: 5,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 2,
                vehicle_type_id: 2,
                price: 200000,
            },
            {
                parking_lot_id: 6,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 1,
                vehicle_type_id: 1,
                price: 200000,
            },
            {
                parking_lot_id: 6,
                name: 'Ưu đãi 100 năm có 1',
                type_id: 2,
                vehicle_type_id: 2,
                price: 200000,
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Packages', null, {})
    },
}
