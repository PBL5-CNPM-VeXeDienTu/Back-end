const models = require(process.cwd() + '/models/index')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

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

async function index(startIndex, limit) {
    return models.ParkingLot.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
    })
}

async function indexByOwnerId(ownerId) {
    return models.ParkingLot.findAndCountAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
        where: { owner_id: ownerId },
    })
}

async function showById(id) {
    return models.ParkingLot.findByPk(id, {
        include: include,
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
