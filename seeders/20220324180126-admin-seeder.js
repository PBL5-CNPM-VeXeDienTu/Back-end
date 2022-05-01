'use strict'

const hash_helper = require('../helpers/password-encrypter/hash_helper')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Nguyễn Hoàng Phú',
                    email: 'nguyenhoangphua1@gmail.com',
                    password: hash_helper.hash('admin01'),
                    role: 3,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Nguyễn Đặng Tuấn Kiệt',
                    email: 'tuankietnk2001@gmail.com',
                    password: hash_helper.hash('admin02'),
                    role: 3,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Hồ Thị Hiếu',
                    email: 'hothihieu2404@gmail.com',
                    password: hash_helper.hash('admin03'),
                    role: 3,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Phạm Văn Thọ',
                    email: 'thopham.21082001@gmail.com',
                    password: hash_helper.hash('admin04'),
                    role: 3,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Nguyễn Phạm Nhật Hào',
                    email: 'fa4820011@gmail.com',
                    password: hash_helper.hash('admin05'),
                    role: 3,
                    is_verified: true,
                    qr_key: '',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, { role: 3 })
    },
}
