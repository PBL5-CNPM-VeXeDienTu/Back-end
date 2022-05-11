'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Vehicles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            license_plate: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            avatar: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            cavet_back: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            cavet_front: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            type_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            brand: {
                type: Sequelize.STRING,
            },
            color: {
                type: Sequelize.STRING,
            },
            detail: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('Vehicles')
    },
}
