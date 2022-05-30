'use strict'

const { getPackageById } = require('../controllers/CRUD/package')
const { checkUserPackageExisted } = require('../controllers/CRUD/user_package')
const {
    getExpireDateOfUserPackage,
} = require('../controllers/api/user_package.controller')

async function generateUserPackageData() {
    let data = []

    const minUserId = 6,
        maxUserId = 8
    const minPackageId = 1,
        maxPackageId = 72

    for (let i = 0; i < 40; i++) {
        let userId, packageId
        do {
            userId = Math.floor(
                Math.random() * (maxUserId - minUserId + 1) + minUserId,
            )
            packageId = Math.floor(
                Math.random() * (maxPackageId - minPackageId + 1) +
                    minPackageId,
            )
        } while (await checkUserPackageExisted(userId, packageId))

        const dbPackage = await getPackageById(packageId)

        if (dbPackage) {
            let userPackage = {
                user_id: userId,
                package_id: dbPackage.id,
                parking_lot_id: dbPackage.parking_lot_id,
                name: dbPackage.name,
                type_id: dbPackage.type_id,
                vehicle_type_id: dbPackage.vehicle_type_id,
                price: dbPackage.price,
                expireAt: await getExpireDateOfUserPackage(dbPackage.type_id),
            }

            data.push(userPackage)
        }
    }

    return data
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'UserPackages',
            await generateUserPackageData(),
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('UserPackages', null, {})
    },
}
