'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('package_types', [
      {
        type_name: 'Week'
      },
      {
        type_name: 'Month'
      },
      {
        type_name: 'Quarter'
      },
      {
        type_name: 'Year'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('package_types', null, {});
  }
};
