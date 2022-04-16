const packageModel = require(process.cwd() + '/models/index').Package

async function index() {
    return packageModel.findAll()
}

async function showById(id) {
    return packageModel.findByPk(id)
}

async function create(newPackage) {
    return packageModel.create(newPackage)
}

async function update(updatePackage, id) {
    return packageModel.update(updatePackage, { where: { id: id } })
}

async function destroy(id) {
    return packageModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getPackageById: showById,
    addNewPackage: create,
    updatePackageById: update,
    deletePackageById: destroy,
}
