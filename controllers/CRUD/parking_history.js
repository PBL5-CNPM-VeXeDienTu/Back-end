const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = (nestedSelection) => [
    {
        model: models.Vehicle,
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.User,
                attributes: [
                    'email',
                    'name',
                    'role',
                    'is_verified',
                    'deletedAt',
                    'createdAt',
                ],
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
                model: models.VehicleType,
                attributes: ['type_name'],
                required: true,
            },
            {
                model: models.VerifyState,
                required: true,
            },
        ],
        where: nestedSelection.vehicle ? nestedSelection.vehicle : {},
    },
    {
        model: models.ParkingLot,
        attributes: { exclude: ['updatedAt'] },
        include: [
            {
                model: models.User,
                attributes: [
                    'email',
                    'name',
                    'role',
                    'is_verified',
                    'deletedAt',
                    'createdAt',
                ],
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
        ],
        where: nestedSelection.parking_lot ? nestedSelection.parking_lot : {},
    },
]

function createSelection(params) {
    return objectCleaner.clean({
        user_id: params.user_id,
        vehicle_id: params.vehicle_id,
        parking_lot_id: params.parking_lot_id,
        checkin_time: params.checkin_time,
        is_parking: params.is_parking,
        qr_key: params.qr_key,
    })
}

function createNestedSelection(params) {
    return objectCleaner.clean({
        vehicle: objectCleaner.clean(params.vehicle),
        parking_lot: objectCleaner.clean(params.parking_lot),
    })
}

async function index(startIndex, limit, params) {
    const selection = createSelection(params)
    const nestedSelection = createNestedSelection(params)

    return models.ParkingHistory.findAndCountAll({
        include: include(nestedSelection),
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: selection,
    })
}

async function indexByUserId(userId, startIndex, limit) {
    return models.ParkingHistory.findAndCountAll({
        include: include(),
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: { user_id: userId },
    })
}

async function showByParams(params) {
    const selection = createSelection(params)
    const nestedSelection = createNestedSelection(params)

    return models.ParkingHistory.findOne({
        include: include(nestedSelection),
        where: selection,
    })
}

async function showById(id) {
    return models.ParkingHistory.findByPk(id, { include: include() })
}

async function create(newParkingHistory) {
    return models.ParkingHistory.create(newParkingHistory)
}

async function update(updateParkingHistory, id) {
    return models.ParkingHistory.update(updateParkingHistory, {
        where: { id: id },
    })
}

async function destroy(id) {
    return models.ParkingHistory.destroy({ where: { id: id } })
}

module.exports = {
    getListParkingHistories: index,
    getListParkingHistoriesByUserId: indexByUserId,
    getParkingHistoryByParams: showByParams,
    getParkingHistoryById: showById,
    addNewParkingHistory: create,
    updateParkingHistoryById: update,
    deleteParkingHistoryById: destroy,
}
