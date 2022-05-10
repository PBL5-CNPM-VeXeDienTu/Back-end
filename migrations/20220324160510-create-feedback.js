'use strict'
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Feedbacks', {
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
            type_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            feature_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            content: {
                type: Sequelize.TEXT,
            },
            is_processed: {
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            response: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('Feedbacks')
    },
}
