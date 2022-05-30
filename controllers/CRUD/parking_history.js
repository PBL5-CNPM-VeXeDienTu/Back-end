const models = require(process.cwd() + '/models/index')

const include = [
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
    },
]

async function index(startIndex, limit) {
    return models.ParkingHistory.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
    })
}

async function indexByUserId(userId, startIndex, limit) {
    return models.ParkingHistory.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: { user_id: userId },
    })
}

async function showById(id) {
    return models.ParkingHistory.findByPk(id, { include: include })
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
    getParkingHistoryById: showById,
    addNewParkingHistory: create,
    updateParkingHistoryById: update,
    deleteParkingHistoryById: destroy,
}
