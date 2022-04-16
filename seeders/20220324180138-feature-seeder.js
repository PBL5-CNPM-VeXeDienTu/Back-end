'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Features',
            [
                {
                    name: '[Basic user] Đăng ký xe',
                },
                {
                    name: '[Basic user] Chỉnh sửa thông tin xe',
                },
                {
                    name: '[Basic user] Hủy đăng ký xe',
                },
                {
                    name: '[Basic user] Quản lý lịch sử gửi xe',
                },
                {
                    name: '[Basic user] Nạp tiền vào ví cá nhân',
                },
                {
                    name: '[Basic user, Parking-lot user] Quản lý lịch sử giao dịch',
                },
                {
                    name: '[Basic user] Mua gói ưu đãi',
                },
                {
                    name: '[Parking-lot user] Đăng ký gói ưu đãi',
                },
                {
                    name: '[Basic user, Parking-lot user] Gửi và phản hồi feedback',
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
                    name: '[Basic user, Parking-lot user] Rút tiền khỏi ví cá nhân',
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Features', null, {})
    },
}
