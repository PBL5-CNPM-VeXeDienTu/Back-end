const models = require(process.cwd() + '/models/index')

async function index() {
    return models.VehicleType.findAndCountAll()
}

async function showById(id) {
    return models.VehicleType.findByPk(id)
}

async function create(newVehicleType) {
    return models.VehicleType.create(newVehicleType)
}

async function update(updateVehicleType, id) {
    return models.VehicleType.update(updateVehicleType, { where: { id: id } })
}

async function destroy(id) {
    return models.VehicleType.destroy({ where: { id: id } })
}

async function checkTypeNameExisted(typeName) {
    return !!(await models.VehicleType.findOne({
        where: {
            type_name: typeName,
        },
    }))
}

module.exports = {
    getListVehicleTypes: index,
    getVehicleTypeById: showById,
    addNewVehicleType: create,
    updateVehicleTypeById: update,
    deleteVehicleTypeById: destroy,
    checkTypeNameExisted: checkTypeNameExisted,
}
