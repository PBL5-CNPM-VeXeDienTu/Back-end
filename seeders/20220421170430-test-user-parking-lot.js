'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'ParkingLots',
            [
                {
                    name: 'Parking lot test 1',
                    address: '53 Ngô Sĩ Liên, Liên Chiểu, Đà Nẵng',
                    avatar: 'public/images/avatars/parking-lot/1.jpg',
                    time_slot: '06:00 - 23:00',
                    capacity: 200,
                    is_open: false,
                    is_full: false,
                    owner_id: 9,
                    verify_state_id: 9,
                    deletedAt: null,
                },
                {
                    name: 'Parking lot test 2',
                    address: 'Đại học Bách Khoa Đà Nẵng',
                    avatar: 'public/images/avatars/parking-lot/2.jpg',
                    time_slot: '06:00 - 23:00',
                    capacity: 200,
                    is_open: false,
                    is_full: false,
                    owner_id: 9,
                    verify_state_id: 10,
                    deletedAt: null,
                },
                {
                    name: 'Parking lot test 3',
                    address: 'Đại học kinh tế Đà Nẵng',
                    avatar: 'public/images/avatars/parking-lot/3.jpg',
                    time_slot: '06:00 - 23:00',
                    capacity: 500,
                    is_open: false,
                    is_full: false,
                    owner_id: 10,
                    verify_state_id: 11,
                    deletedAt: null,
                },
                {
                    name: 'Parking lot test 4',
                    address: '255-257 Hùng Vương, Thanh Khê, Đà Nẵng',
                    avatar: 'public/images/avatars/parking-lot/4.jpg',
                    time_slot: '24/7',
                    capacity: 100,
                    is_open: false,
                    is_full: false,
                    owner_id: 11,
                    verify_state_id: 12,
                    deletedAt: null,
                },
                {
                    name: 'Parking lot test 5',
                    address: '255 Phan Châu Trinh, Hải Châu, Đà Nẵng',
                    avatar: 'public/images/avatars/parking-lot/5.jpg',
                    time_slot: '24/7',
                    capacity: 100,
                    is_open: false,
                    is_full: false,
                    owner_id: 11,
                    verify_state_id: 13,
                    deletedAt: null,
                },
                {
                    name: 'Parking lot test 6',
                    address: '37 Lý Thái Tổ, quận Thanh Khê, TP. Đà Nẵng',
                    avatar: 'public/images/avatars/parking-lot/6.jpg',
                    time_slot: '06:00 - 23:00',
                    capacity: 150,
                    is_open: false,
                    is_full: false,
                    owner_id: 11,
                    verify_state_id: 14,
                    deletedAt: null,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('ParkingLots', null, {})
    },
}
