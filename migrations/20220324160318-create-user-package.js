'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserPackages', {
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
            package_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            parking_lot_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            type_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            vehicle_type_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            expireAt: {
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
        await queryInterface.dropTable('UserPackages')
    },
}
