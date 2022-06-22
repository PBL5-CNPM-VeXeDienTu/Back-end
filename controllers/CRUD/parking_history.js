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
                model: models.VerifyState,
                required: true,
            },
        ],
    },
]

const PARKING_USER_ROLE = 1
const PARKING_LOT_USER_ROLE = 2

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$Vehicle.license_plate$': { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        is_parking: params.is_parking !== '' ? params.is_parking : null,
        checkin_time: {
            [Op.between]: [params.checkin_from_date, params.checkin_to_date],
        },
        checkout_time: {
            [Op.between]: [params.checkout_from_date, params.checkout_to_date],
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

async function indexByUserId(userId, startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$Vehicle.license_plate$': { [Op.like]: `%${params.txt_search}%` },
            '$ParkingLot.name$': { [Op.like]: `%${params.txt_search}%` },
        }),
        is_parking: params.is_parking !== '' ? params.is_parking : null,
        checkin_time: {
            [Op.between]: [params.checkin_from_date, params.checkin_to_date],
        },
        checkout_time: {
            [Op.between]: [params.checkout_from_date, params.checkout_to_date],
        },
        user_id: params.role === PARKING_USER_ROLE ? userId : null,
        '$ParkingLot.Owner.id$':
            params.role === PARKING_LOT_USER_ROLE ? userId : null,
        parking_lot_id:
            params.parking_lot_id !== '' ? params.parking_lot_id : null,
    })

    return models.ParkingHistory.findAndCountAll(
        objectCleaner.clean({
            include: include,
            offset: Number.isNaN(startIndex) ? null : startIndex,
            limit: Number.isNaN(limit) ? null : limit,
            order: [['id', 'DESC']],
            where: selection,
        }),
    )
}

async function showByParams(params) {
    const selection = objectCleaner.clean({
        parking_lot_id: params.parking_lot_id,
        is_parking: params.is_parking,
        checkin_time: params.checkin_time,
        checkout_time: params.checkout_time,
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
