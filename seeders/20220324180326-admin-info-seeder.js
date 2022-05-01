'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'UserInfos',
            [
                {
                    user_id: 1,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: 'Đăk Lắk',
                    phone_number: '0941331115',
                    gender: 1,
                },
                {
                    user_id: 2,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: 'Đà Nẵng',
                    phone_number: '0905676905',
                    gender: 1,
                },
                {
                    user_id: 3,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: 'Huế',
                    phone_number: '0394285138',
                    gender: 0,
                },
                {
                    user_id: 4,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: 'Đà Nẵng',
                    phone_number: '0702399134',
                    gender: 1,
                },
                {
                    user_id: 5,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: 'Quãng Ngãi',
                    phone_number: '0961286147',
                    gender: 1,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserInfos', null, { role: 3 })
    },
}
