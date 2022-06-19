const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = [
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
]

async function index(startIndex, limit, isAdmin, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$Owner.name$': { [Op.like]: `%${params.txt_search}%` },
            brand: { [Op.like]: `%${params.txt_search}%` },
            license_plate: { [Op.like]: `%${params.txt_search}%` },
            '$VehicleType.type_name$': { [Op.like]: `%${params.txt_search}%` },
            '$VerifyState.state$': { [Op.like]: `%${params.txt_search}%` },
        }),
        type_id: params.type_id !== '' ? params.type_id : null,
        verify_state_id:
            params.verify_state_id !== '' ? params.verify_state_id : null,
        createdAt: {
            [Op.between]: [params.from_date, params.to_date],
        },
        deletedAt: isAdmin
            ? { [Op.or]: [{ [Op.is]: null }, { [Op.not]: null }] }
            : { [Op.is]: null },
    })

    return models.Vehicle.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['license_plate', 'ASC'],
        ],
        where: selection,
    })
}

async function indexByOwnerId(ownerId, isAdmin) {
    return models.Vehicle.findAndCountAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['license_plate', 'ASC'],
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
    return models.Vehicle.findByPk(id, {
        include: include,
    })
}

async function showByLicensePlate(licensePlate) {
    return models.Vehicle.findOne({
        include: include,
        where: { license_plate: licensePlate },
    })
}

async function create(newVehicle) {
    return models.Vehicle.create(newVehicle)
}

async function update(updateVehicle, id) {
    return models.Vehicle.update(updateVehicle, { where: { id: id } })
}

async function destroyByOwnerId(ownerId) {
    const now = getCurrentDateTime()

    // Update deletedAt field of vehicle
    const updateVehicle = {
        deletedAt: now,
    }
    return models.Vehicle.update(updateVehicle, {
        where: { owner_id: ownerId },
    })
}

async function destroy(id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of vehicle
    const updateVehicle = {
        deletedAt: now,
    }
    await update(updateVehicle, id)
}

async function checkOwner(vehicleId, userId) {
    return !!(await models.Vehicle.findOne({
        where: { id: vehicleId, owner_id: userId },
    }))
}

module.exports = {
    getListVehicles: index,
    getListVehiclesByOwnerId: indexByOwnerId,
    getVehicleById: showById,
    getVehicleByLicensePlate: showByLicensePlate,
    addNewVehicle: create,
    updateVehicleById: update,
    softDeleteVehicleById: destroy,
    softDeleteVehicleByOwnerId: destroyByOwnerId,
    checkUserOwnVehicle: checkOwner,
}
