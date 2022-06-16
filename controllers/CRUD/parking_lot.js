const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

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
        model: models.VerifyState,
        required: true,
    },
]

async function index(startIndex, limit, isAdmin, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            name: { [Op.like]: `%${params.txt_search}%` },
            address: { [Op.like]: `%${params.txt_search}%` },
            '$Owner.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        is_open: params.is_open !== '' ? params.is_open : null,
        is_full: params.is_full !== '' ? params.is_full : null,
        deletedAt: isAdmin
            ? { [Op.or]: [{ [Op.is]: null }, { [Op.not]: null }] }
            : { [Op.is]: null },
    })

    return models.ParkingLot.findAndCountAll({
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

async function indexByOwnerId(ownerId, isAdmin) {
    return models.ParkingLot.findAndCountAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
        where: {
            owner_id: ownerId,
            deletedAt: isAdmin
                ? { [Op.or]: [{ [Op.is]: null }, { [Op.not]: null }] }
                : { [Op.is]: null },
        },
    })
}

async function showById(id) {
    return models.ParkingLot.findByPk(id, {
        include: [
            ...include,
            {
                model: models.ParkingPrice,
                include: {
                    model: models.VehicleType,
                    attributes: ['id', 'type_name'],
                    required: true,
                },
            },
        ],
    })
}

async function showByName(name) {
    return models.ParkingLot.findOne({
        include: include,
        where: { name: name },
    })
}

async function create(newParkingLot) {
    return models.ParkingLot.create(newParkingLot)
}

async function update(updateParkingLot, id) {
    return models.ParkingLot.update(updateParkingLot, { where: { id: id } })
}

async function destroyByOwnerId(ownerId) {
    const now = getCurrentDateTime()

    // Update deletedAt field of vehicle
    const updateParkingLot = {
        deletedAt: now,
    }
    return models.ParkingLot.update(updateParkingLot, {
        where: { owner_id: ownerId },
    })
}

async function destroy(id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of parking-lot
    const updateParkingLot = {
        deletedAt: now,
    }
    await update(updateParkingLot, id)
}

async function checkOwner(parkingLotId, userId) {
    return !!(await models.ParkingLot.findOne({
        where: { id: parkingLotId, owner_id: userId },
    }))
}

module.exports = {
    getListParkingLots: index,
    getListParkingLotsByOwnerId: indexByOwnerId,
    getParkingLotById: showById,
    getParkingLotByName: showByName,
    addNewParkingLot: create,
    updateParkingLotById: update,
    softDeleteParkingLotById: destroy,
    softDeleteParkingLotByOwnerId: destroyByOwnerId,
    checkUserOwnParkingLot: checkOwner,
}
