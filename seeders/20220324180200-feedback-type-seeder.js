'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Feedback_types', [
      {
        type_name: 'Câu hỏi (Để nhận được câu trả lời, hãy nhập địa chỉ email mà bạn muốn nhận câu trả lời)'
      },
      {
        type_name: 'Liên lạc về lỗi của hệ thống'
      },
      {
        type_name: 'Mong muốn thêm chức năng'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Feedback_types', null, {});
  }
};
