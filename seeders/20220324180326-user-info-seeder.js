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
                    address: '',
                    phone_number: '',
                    gender: 1,
                },
                {
                    user_id: 2,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: '',
                    phone_number: '',
                    gender: 1,
                },
                {
                    user_id: 3,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: '',
                    phone_number: '',
                    gender: 0,
                },
                {
                    user_id: 4,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: '',
                    phone_number: '',
                    gender: 1,
                },
                {
                    user_id: 5,
                    avatar: 'public/images/avatars/user/default-avatar.png',
                    birthday: '2001/01/01',
                    address: '',
                    phone_number: '',
                    gender: 1,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('UserInfos', null, {})
    },
}
