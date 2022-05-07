const models = require(process.cwd() + '/models/index')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const include = [
    {
        model: models.User,
        attributes: ['email', 'name', 'deletedAt', 'createdAt'],
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
    return models.ParkingLot.findAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
    })
}

async function indexByOwnerId(owner_id) {
    return models.ParkingLot.findAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
        where: { owner_id: owner_id },
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

async function destroyByOwnerId(owner_id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of vehicle
    const updateParkingLot = {
        deletedAt: now,
    }
    return models.ParkingLot.update(updateParkingLot, {
        where: { owner_id: owner_id },
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

async function checkOwner(vehicleId, userId) {
    return !!models.ParkingLot.findOne({
        where: { id: vehicleId, owner_id: userId },
    })
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
