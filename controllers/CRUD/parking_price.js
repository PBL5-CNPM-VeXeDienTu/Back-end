const models = require(process.cwd() + '/models/index')

const include = [
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
            {
                model: models.VerifyState,
                required: true,
            },
        ],
        required: true,
    },
    {
        model: models.VehicleType,
        attributes: ['type_name'],
        required: true,
    },
]

async function index() {
    return models.ParkingPrice.findAndCountAll()
}

async function showByParkingLotId(parkingLotId) {
    return models.ParkingPrice.findAndCountAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
        where: { parking_lot_id: parkingLotId },
    })
}

async function showById(id) {
    return models.ParkingPrice.findByPk(id, {
        include: include,
    })
}

async function showByParkingLotIdAndVehicleTypeId(parkingLotId, vehicleTypeId) {
    return models.ParkingPrice.findOne({
        where: { parking_lot_id: parkingLotId, vehicle_type_id: vehicleTypeId },
    })
}

async function create(newParkingPrice) {
    return models.ParkingPrice.create(newParkingPrice)
}

async function update(updateParkingPrice, id) {
    return models.ParkingPrice.update(updateParkingPrice, { where: { id: id } })
}

async function destroy(id) {
    return models.ParkingPrice.destroy({ where: { id: id } })
}

async function checkOwner(parkingPriceId, userId) {
    return !!(await models.ParkingPrice.findOne({
        include: include,
        where: {
            id: parkingPriceId,
            user_id: userId,
        },
    }))
}

module.exports = {
    index: index,
    getParkingPricesByParkingLotId: showByParkingLotId,
    getParkingPriceById: showById,
    getParkingPriceByParkingLotIdAndVehicleTypeId:
        showByParkingLotIdAndVehicleTypeId,
    addNewParkingPrice: create,
    updateParkingPriceById: update,
    deleteParkingPriceById: destroy,
    checkUserOwnParkingPrice: checkOwner,
}
