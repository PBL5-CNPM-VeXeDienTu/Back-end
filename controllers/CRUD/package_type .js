const packageTypeModel = require(process.cwd() + '/models/index').PackageType

async function index() {
    return packageTypeModel.findAndCountAll()
}

async function showById(id) {
    return packageTypeModel.findByPk(id)
}

async function create(newPackageType) {
    return packageTypeModel.create(newPackageType)
}

async function update(updatePackageType, id) {
    return packageTypeModel.update(updatePackageType, { where: { id: id } })
}

async function destroy(id) {
    return packageTypeModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getPackageTypeById: showById,
    addNewPackageType: create,
    updatePackageTypeById: update,
    deletePackageTypeById: destroy,
}
