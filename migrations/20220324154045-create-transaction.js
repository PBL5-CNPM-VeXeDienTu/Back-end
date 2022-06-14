'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            wallet_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            old_balance: {
                type: Sequelize.FLOAT,
            },
            amount: {
                type: Sequelize.FLOAT,
            },
            new_balance: {
                type: Sequelize.FLOAT,
            },
            type_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            reference_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Transactions')
    },
}
