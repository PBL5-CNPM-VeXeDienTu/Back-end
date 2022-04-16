'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ParkingLots', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING,
            },
            time_slot: {
                type: Sequelize.STRING,
            },
            capacity: {
                type: Sequelize.INTEGER,
            },
            is_open: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            is_full: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            owner_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            verify_state_id: {
                type: Sequelize.INTEGER,
            },
            deletedAt: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable('ParkingLots')
    },
}
