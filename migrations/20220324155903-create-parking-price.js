'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parking_prices', {
      parking_lot_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bike: {
        type: Sequelize.FLOAT
      },
      motobike: {
        type: Sequelize.FLOAT
      },
      car: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Parking_prices');
  }
};