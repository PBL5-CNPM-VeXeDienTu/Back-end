'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Wallets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                unique: true,
                type: Sequelize.INTEGER,
            },
            balance: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('Wallets')
    },
}
