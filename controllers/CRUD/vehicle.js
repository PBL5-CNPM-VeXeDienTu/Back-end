const vehicleModel = require(process.cwd() + '/models/index').Vehicle
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

async function index() {
    return vehicleModel.findAll()
}

async function showById(id) {
    return vehicleModel.findByPk(id)
}

async function showByUserId(owner_id) {
    return vehicleModel.findOne(owner_id)
}

async function create(newVehicle) {
    return vehicleModel.create(newVehicle)
}

async function update(updateVehicle, id) {
    return vehicleModel.update(updateVehicle, { where: { id: id } })
}

async function destroyByOwnerId(owner_id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of vehicle
    const updateVehicle = {
        deletedAt: now,
    }
    return vehicleModel.update(updateVehicle, { where: { owner_id: owner_id } })
}

async function destroy(id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of vehicle
    const updateVehicle = {
        deletedAt: now,
    }
    await update(updateVehicle, id)
}

module.exports = {
    index: index,
    getVehicleById: showById,
    getVehicleByUserId: showByUserId,
    addNewVehicle: create,
    updateVehicleById: update,
    softDeleteVehicleByOwnerId: destroyByOwnerId,
    softDeleteVehicleById: destroy,
}
