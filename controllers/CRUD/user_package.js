const models = require('../../models');

async function index() {
    return await models.UserPackage.findAll();
}

async function showById(id) {
    return await models.UserPackage.findByPk(id);
}

async function create(newUserPackage) {
    await models.UserPackage.create(newUserPackage);
}

async function update(id, updateUserPackage) {
    await models.UserPackage.update(_updateUserPackage, { where: { id: id } });
}

async function destroy(id) {
    await models.UserPackage.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
