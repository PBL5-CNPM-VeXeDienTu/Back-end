'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'VerifyStates',
            [
                {
                    state: 'Đang chờ xử lý',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đang chờ xử lý',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Không đạt yêu cầu',
                    note: 'Hình ảnh cavet xe bị mờ',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đang chờ xử lý',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đã được kiểm duyệt',
                    note: '',
                },
                {
                    state: 'Đang chờ xử lý',
                    note: '',
                },
                {
                    state: 'Không đạt yêu cầu',
                    note: 'Không tìm thấy bãi đỗ xe ở địa chỉ này',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('VerifyStates', null, {})
    },
}
