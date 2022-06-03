const models = require(process.cwd() + '/models/index')

async function index() {
    return models.PackageType.findAndCountAll()
}

async function showById(id) {
    return models.PackageType.findByPk(id)
}

async function create(newPackageType) {
    return models.PackageType.create(newPackageType)
}

async function update(updatePackageType, id) {
    return models.PackageType.update(updatePackageType, { where: { id: id } })
}

async function destroy(id) {
    return models.PackageType.destroy({ where: { id: id } })
}

async function checkTypeNameExisted(typeName) {
    return !!(await models.PackageType.findOne({
        where: {
            type_name: typeName,
        },
    }))
}

module.exports = {
    getListPackageTypes: index,
    getPackageTypeById: showById,
    addNewPackageType: create,
    updatePackageTypeById: update,
    deletePackageTypeById: destroy,
    checkTypeNameExisted: checkTypeNameExisted,
}
