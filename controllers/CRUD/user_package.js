const models = require(process.cwd() + '/models/index')

const include = [
    {
        model: models.User,
        attributes: { exclude: ['password', 'qr_key', 'updatedAt'] },
        include: [
            {
                model: models.Role,
                attributes: ['name'],
            },
        ],
        as: 'Owner',
        required: true,
    },
    {
        model: models.Package,
        attributes: { exclude: ['createdAt', 'updateAt'] },
        require: true,
    },
    {
        model: models.ParkingLot,
        required: true,
    },
    {
        model: models.PackageType,
        attributes: ['type_name'],
        required: true,
    },
    {
        model: models.VehicleType,
        attributes: ['type_name'],
        required: true,
    },
]

async function index(startIndex, limit) {
    return models.UserPackage.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
    })
}

async function showById(id) {
    return models.UserPackage.findByPk(id, {
        include: include,
    })
}

async function showByOwnerId(ownerId, startIndex, limit) {
    return models.UserPackage.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
        where: { user_id: ownerId },
    })
}

async function create(newUserPackage) {
    return models.UserPackage.create(newUserPackage)
}

async function update(updateUserPackage, id) {
    return models.UserPackage.update(updateUserPackage, { where: { id: id } })
}

async function destroy(id) {
    return models.UserPackage.destroy({ where: { id: id } })
}

async function checkOwner(userPackageId, userId) {
    return !!(await models.UserPackage.findOne({
        include: include,
        where: {
            id: userPackageId,
            user_id: userId,
        },
    }))
}

async function checkExisted(userId, packageId) {
    return !!(await models.UserPackage.findOne({
        where: {
            user_id: userId,
            package_id: packageId,
            expireAt: null,
        },
    }))
}

module.exports = {
    getListUserPackages: index,
    getUserPackageById: showById,
    getUserPackageByOwnerId: showByOwnerId,
    addNewUserPackage: create,
    updateUserPackageById: update,
    deleteUserPackageById: destroy,
    checkUserOwnUserPackage: checkOwner,
    checkUserPackageExisted: checkExisted,
}
