const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = [
    {
        model: models.ParkingLot,
        include: [
            {
                model: models.User,
                attributes: { exclude: ['password', 'updatedAt'] },
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

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            name: { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        type_id: params.type_id !== '' ? params.type_id : null,
        vehicle_type_id:
            params.vehicle_type_id !== '' ? params.vehicle_type_id : null,
    })

    return models.Package.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
        where: selection,
    })
}

async function indexByOwnerId(ownerId, startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            name: { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        type_id: params.type_id !== '' ? params.type_id : null,
        vehicle_type_id:
            params.vehicle_type_id !== '' ? params.vehicle_type_id : null,
        '$ParkingLot.owner_id$': ownerId,
    })

    return models.Package.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
        where: selection,
    })
}

async function indexByParkingLotId(parkingLotId, startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            name: { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        type_id: params.type_id !== '' ? params.type_id : null,
        vehicle_type_id:
            params.vehicle_type_id !== '' ? params.vehicle_type_id : null,
        parking_lot_id: parkingLotId,
    })

    return models.Package.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
        where: selection,
    })
}

async function showById(id) {
    return models.Package.findByPk(id, {
        include: include,
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
    getListPackagesByParkingLotId: indexByParkingLotId,
    getListPackagesByOwnerId: indexByOwnerId,
    getPackageById: showById,
    addNewPackage: create,
    updatePackageById: update,
    deletePackageById: destroy,
    checkUserOwnPackage: checkOwner,
}
