'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ParkingHistories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            vehicle_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            parking_lot_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            checkin_time: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            checkout_time: {
                type: Sequelize.DATE,
            },
            is_parking: {
                defaultValue: true,
                type: Sequelize.BOOLEAN,
            },
            memo: {
                type: Sequelize.TEXT,
            },
            cost: {
                type: Sequelize.FLOAT,
            },
            qr_key: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW'),
            },
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ParkingHistories')
    },
}
