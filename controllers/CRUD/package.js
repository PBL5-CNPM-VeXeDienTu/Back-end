const { Op } = require("sequelize");

const models = require(process.cwd() + '/models/index')

const include = (ownerId) => [
    {
        model: models.ParkingLot,
        include: [
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
        ],
        where: { owner_id: ownerId ? ownerId : { [Op.gt]: 0 } },
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
    return models.Package.findAndCountAll({
        include: include(),
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
    })
}

async function showById(id) {
    return models.Package.findByPk(id, {
        include: include(),
    })
}

async function showByParkingLotId(parkingLotId, startIndex, limit) {
    return models.Package.findAndCountAll({
        include: include(),
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
        where: { parking_lot_id: parkingLotId },
    })
}

async function showByOwnerId(ownerId, startIndex, limit) {
    return models.Package.findAndCountAll({
        include: include(ownerId),
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
    })
}



async function create(newPackage) {
    return models.Package.create(newPackage)
}

async function update(updatePackage, id) {
    return models.Package.update(updatePackage, { where: { id: id } })
}

async function destroy(id) {
    return models.Package.destroy({ where: { id: id } })
}

async function checkOwner(packageId, userId) {
    return !!(await models.Package.findOne({
        include: include,
        where: {
            id: packageId,
            user_id: userId,
        },
    }))
}

module.exports = {
    getListPackages: index,
    getPackageById: showById,
    getPackageByParkingLotId: showByParkingLotId,
    getPackageByOwnerId: showByOwnerId,
    addNewPackage: create,
    updatePackageById: update,
    deletePackageById: destroy,
    checkUserOwnPackage: checkOwner,
}
