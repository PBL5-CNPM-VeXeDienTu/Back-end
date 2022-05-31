const vehicleTypeModel = require(process.cwd() + '/models/index').VehicleType

async function index() {
    return vehicleTypeModel.findAndCountAll()
}

async function showById(id) {
    return vehicleTypeModel.findByPk(id)
}

async function create(newVehicleType) {
    return vehicleTypeModel.create(newVehicleType)
}

async function update(updateVehicleType, id) {
    return vehicleTypeModel.update(updateVehicleType, { where: { id: id } })
}

async function destroy(id) {
    return vehicleTypeModel.destroy({ where: { id: id } })
}

module.exports = {
    getListVehicleTypes: index,
    getVehicleTypeById: showById,
    addNewVehicleType: create,
    updateVehicleTypeById: update,
    deleteVehicleTypeById: destroy,
}
