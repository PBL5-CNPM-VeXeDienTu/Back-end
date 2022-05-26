const models = require(process.cwd() + '/models/index')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const include = [
    {
        model: models.User,
        attributes: ['email', 'name', 'is_verified', 'deletedAt', 'createdAt'],
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

async function index(startIndex, limit) {
    return models.Vehicle.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['license_plate', 'ASC'],
        ],
    })
}

async function indexByOwnerId(ownerId) {
    return models.Vehicle.findAndCountAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['license_plate', 'ASC'],
        ],
        where: { owner_id: ownerId },
    })
}

async function showById(id) {
    return models.Vehicle.findByPk(id, {
        include: include,
    })
}

async function showByLicensePlate(license_plate) {
    return models.Vehicle.findOne({
        include: include,
        where: { license_plate: license_plate },
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
