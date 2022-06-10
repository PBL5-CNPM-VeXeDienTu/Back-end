'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Features',
            [
                {
                    name: '[Parking user] Đăng ký xe',
                },
                {
                    name: '[Parking user] Chỉnh sửa thông tin xe',
                },
                {
                    name: '[Parking user] Hủy đăng ký xe',
                },
                {
                    name: '[Parking user] Quản lý lịch sử gửi xe',
                },
                {
                    name: '[Parking user] Nạp tiền vào ví cá nhân',
                },
                {
                    name: '[Parking user, Parking-lot user] Quản lý lịch sử giao dịch',
                },
                {
                    name: '[Parking user] Mua gói ưu đãi',
                },
                {
                    name: '[Parking-lot user] Đăng ký gói ưu đãi',
                },
                {
                    name: '[Parking user, Parking-lot user] Gửi và phản hồi feedback',
                },
                {
                    name: '[Parking-lot user] Quản lý xe ra vào bãi (checkin, checkout, lịch sử xe ra vào)',
                },
                {
                    name: '[Parking-lot user] Đăng ký bãi đỗ xe',
                },
                {
                    name: '[Parking-lot user] Chỉnh sửa thông tin bãi đỗ xe',
                },
                {
                    name: '[Parking-lot user] Hủy đăng ký bãi đỗ xe',
                },
                {
                    name: '[Parking-lot user] Thông kê doanh thu',
                },
                {
                    name: '[Parking-lot user] Tạo gói ưu đãi',
                },
                {
                    name: '[Parking-lot user] Chỉnh sửa gói ưu đãi',
                },
                {
                    name: '[Parking-lot user] Xóa gói ưu đãi',
                },
                {
                    name: '[Parking user, Parking-lot user] Rút tiền khỏi ví cá nhân',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Features', null, {})
    },
}
