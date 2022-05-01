'use strict'

const hash_helper = require('../helpers/password-encrypter/hash_helper')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Basic user 1',
                    email: 'basicuser1@gmail.com',
                    password: hash_helper.hash('basic01'),
                    role: 1,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Basic user 2',
                    email: 'basicuser2@gmail.com',
                    password: hash_helper.hash('basic02'),
                    role: 1,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Basic user 3',
                    email: 'basicuser3@gmail.com',
                    password: hash_helper.hash('basic03'),
                    role: 1,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Parking lot user 1',
                    email: 'parkinglotuser1@gmail.com',
                    password: hash_helper.hash('parking01'),
                    role: 2,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Parking lot user 2',
                    email: 'parkinglotuser2@gmail.com',
                    password: hash_helper.hash('parking02'),
                    role: 2,
                    is_verified: true,
                    qr_key: '',
                },
                {
                    name: 'Parking lot user 3',
                    email: 'parkinglotuser3@gmail.com',
                    password: hash_helper.hash('parking03'),
                    role: 2,
                    is_verified: true,
                    qr_key: '',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {
            [Op.or]: [{ role: 1 }, { role: 2 }],
        })
    },
}
