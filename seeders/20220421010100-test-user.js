'use strict'

const hash_helper = require('../helpers/password-encrypter/hash_helper')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Parking user 1',
                    email: 'parkinguser1@gmail.com',
                    password: hash_helper.hash('parking01'),
                    role: 1,
                    is_verified: true,
                },
                {
                    name: 'Parking user 2',
                    email: 'parkinguser2@gmail.com',
                    password: hash_helper.hash('parking02'),
                    role: 1,
                    is_verified: true,
                },
                {
                    name: 'Parking user 3',
                    email: 'parkinguser3@gmail.com',
                    password: hash_helper.hash('parking03'),
                    role: 1,
                    is_verified: true,
                },
                {
                    name: 'Parking lot user 1',
                    email: 'parkinglotuser1@gmail.com',
                    password: hash_helper.hash('parkinglot01'),
                    role: 2,
                    is_verified: true,
                },
                {
                    name: 'Parking lot user 2',
                    email: 'parkinglotuser2@gmail.com',
                    password: hash_helper.hash('parkinglot02'),
                    role: 2,
                    is_verified: true,
                },
                {
                    name: 'Parking lot user 3',
                    email: 'parkinglotuser3@gmail.com',
                    password: hash_helper.hash('parkinglot03'),
                    role: 2,
                    is_verified: true,
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
