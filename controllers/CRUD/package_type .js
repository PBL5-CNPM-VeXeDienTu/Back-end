const models = require('../../models');

async function index() {
    return await models.PackageType.findAll();
}

async function showById(id) {
    return await models.PackageType.findByPk(id);
}

async function create(newPackageType) {
    await models.PackageType.create(newPackageType);
}

async function update(id, updatePackageType) {
    await models.PackageType.update(updatePackageType, { where: { id: id } });
}

async function destroy(id) {
    await models.PackageType.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
