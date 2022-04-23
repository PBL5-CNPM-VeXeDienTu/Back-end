'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Vehicles',
            [
                {
                    license_plate: '43-K1055.55',
                    avatar: 'public/images/avatars/vehicle/1.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'SH',
                    color: 'Trắng',
                    detail: 'Thuộc phân khúc xe ga cao cấp và thừa hưởng thiết kế sang trọng nổi tiếng của dòng xe SH, Sh mode luôn được đánh giá cao nhờ kiểu dáng sang trọng, tinh tế tới từng đường nét, động cơ tiên tiến và các tiện nghi cao cấp xứng tầm phong cách sống thời thượng, đẳng cấp.',
                    owner_id: 6,
                    verify_state_id: 1,
                    deletedAt: null,
                },
                {
                    license_plate: '43-C1092.82',
                    avatar: 'public/images/avatars/vehicle/2.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Wave alpha',
                    color: 'Xanh biển',
                    detail: 'Wave Alpha 110cc phiên bản 2020 trẻ trung và cá tính với thiết kế bộ tem mới, tạo những điểm nhấn ấn tượng, thu hút ánh nhìn, cho bạn tự tin ghi lại dấu ấn cùng bạn bè của mình trên mọi hành trình.',
                    owner_id: 6,
                    verify_state_id: 2,
                    deletedAt: null,
                },
                {
                    license_plate: '43-C1264.02',
                    avatar: 'public/images/avatars/vehicle/3.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Winner V1',
                    color: 'Đen',
                    detail: 'Xe Honda Winner 150 là mẫu xe côn tay được Công ty Honda Việt Nam giới thiệu tại triển lãm Ô tô xe máy Việt Nam 2016 nhằm thoả mãn nhu cầu của khách hàng có đam mê xe thể thao cao cấp. Đến nay, Honda Winner 150 đã được thay thế bằng thế hệ Winner X mới.',
                    owner_id: 7,
                    verify_state_id: 3,
                    deletedAt: null,
                },
                {
                    license_plate: '43-X51621',
                    avatar: 'public/images/avatars/vehicle/4.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Vision',
                    color: 'Hồng',
                    detail: 'Thuộc phân khúc xe tay ga giá thấp, Vision luôn là mẫu xe được ưa chuộng trong giới trẻ và có số lượng bán ra lớn nhất tại thị trường Việt Nam suốt nhiều năm qua nhờ kiểu dáng trẻ trung, thanh lịch và nhỏ gọn. Sau 6 năm kể từ lần thay đổi lớn gần nhất vào năm 2014, chiếc xe Vision 2020 đã được nâng cấp toàn diện cả về kiểu dáng thời trang cùng những tiện ích và công nghệ hiện đại, hứa hẹn mang đến những trải nghiệm vượt xa kỳ vọng cho những người trẻ năng động và luôn dẫn đầu xu hướng.',
                    owner_id: 7,
                    verify_state_id: 4,
                    deletedAt: null,
                },
                {
                    license_plate: '43-A5278.58',
                    avatar: 'public/images/avatars/vehicle/5.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Satria F150',
                    color: 'Đỏ trắng',
                    detail: 'Satria F150 được trang bị động cơ mạnh mẽ, thừa hưởng công nghệ tiên tiến của Suzuki chế tạo cho các dòng xe đua nổi tiếng. Công suất tối đa mạnh mẽ kết hợp cùng trọng lượng thân xe tối ưu giúp cho Satria có khả năng tăng tốc nhanh và mạnh mẽ nhất phân khúc xe 150cc.',
                    owner_id: 7,
                    verify_state_id: 5,
                    deletedAt: null,
                },
                {
                    license_plate: '43-M1336.28',
                    avatar: 'public/images/avatars/vehicle/6.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Cub 50',
                    color: 'Xanh trắng',
                    detail: 'Sở hữu công nghệ sơn nhiều lớp sang, sáng và bóng bẩy giúp nâng cao độ bền màu, chắc chắn sẽ thu hút người đối diện ngay từ cái nhìn đầu tiên.',
                    owner_id: 8,
                    verify_state_id: 6,
                    deletedAt: null,
                },
                {
                    license_plate: '43A-616.39',
                    avatar: 'public/images/avatars/vehicle/7.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Ferrari SF90 Spider',
                    color: 'Vàng',
                    detail: 'Xe có chiều dài x rộng x cao lần lượt là 4.704 x 1.973 x 1.191 mm, kích thước này ngắn hơn 6 mm nhưng rộng hơn 1 mm và cao hơn 5 mm so với bản coupe (SF90 Stradale).',
                    owner_id: 8,
                    verify_state_id: 7,
                    deletedAt: null,
                },
                {
                    license_plate: '43A-299.99',
                    avatar: 'public/images/avatars/vehicle/8.jpg',
                    cavet_back: 'public/images/cavet/back/back-test.jpg',
                    cavet_front: 'public/images/cavet/front/front-test.jpg',
                    type: 'Mercedes-Benz EQS',
                    color: 'Đen',
                    detail: 'Bản EQS 350 tiêu chuẩn, xe được trang bị một động cơ điện phía sau duy nhất sản sinh công suất 292 mã lực và mô-men xoắn 565 Nm, trong khi chiếc EQS 450+ có công suất lên tới 333 mã lực.',
                    owner_id: 8,
                    verify_state_id: 8,
                    deletedAt: null,
                },
            ],
            {},
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Vehicles', null, {})
    },
}
