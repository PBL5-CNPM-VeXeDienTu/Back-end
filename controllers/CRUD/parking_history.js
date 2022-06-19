const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = [
    {
        model: models.Vehicle,
        attributes: { exclude: ['updatedAt'] },
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

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$Vehicle.license_plate$': { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        is_parking: params.is_parking !== '' ? params.is_parking : null,
        createdAt: {
            [Op.between]: [params.from_date, params.to_date],
        },
    })

    return models.ParkingHistory.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: selection,
    })
}

async function indexByUserId(userId, startIndex, limit) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$Vehicle.license_plate$': { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        is_parking: params.is_parking !== '' ? params.is_parking : null,
        createdAt: {
            [Op.between]: [params.from_date, params.to_date],
        },
        user_id: userId,
    })

    return models.ParkingHistory.findAndCountAll({
        include: include(),
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: selection,
    })
}

async function showByParams(params) {
    const selection = objectCleaner.clean({
        parking_lot_id: params.parking_lot_id,
        is_parking: params.is_parking,
        checkin_time: params.checkin_time,
        qr_key: params.qr_key,
        '$Vehicle.id$': params.vehicle_id,
        '$Vehicle.license_plate$': params.license_plate,
    })

    return models.ParkingHistory.findOne({
        include: include,
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
