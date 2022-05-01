'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'UserInfos',
            [
                {
                    user_id: 6,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/06/19',
                    address: 'Đà Nẵng',
                    phone_number: '0935014520',
                    gender: 1,
                },
                {
                    user_id: 7,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/10/16',
                    address: 'Quảng Bình',
                    phone_number: '0354374322',
                    gender: 1,
                },
                {
                    user_id: 8,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/11/05',
                    address: 'Bắc Giang',
                    phone_number: '0981669453',
                    gender: 1,
                },
                {
                    user_id: 9,
                    avatar: 'public/images/avatars/parking-lot/default-avatar.png',
                    birthday: '2001/04/21',
                    address: 'Đà Nẵng',
                    phone_number: '0123456789',
                    gender: 0,
                },
                {
                    user_id: 10,
                    avatar: 'public/images/avatars/parking-lot/default-avatar.png',
                    birthday: '2001/05/06',
                    address: 'Đà Nẵng',
                    phone_number: '0123456789',
                    gender: 0,
                },
                {
                    user_id: 11,
                    avatar: 'public/images/avatars/parking-lot/default-avatar.png',
                    birthday: '2001/09/28',
                    address: 'Đà Nẵng',
                    phone_number: '0123456789',
                    gender: 1,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserInfos', null, {
            [Op.or]: [{ role: 1 }, { role: 2 }],
        })
    },
}
