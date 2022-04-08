const userPackageModel = require(process.cwd() + '/models/index').UserPackage;

async function index() {
    return userPackageModel.findAll();
}

async function showById(id) {
    return userPackageModel.findByPk(id);
}

async function create(newUserPackage) {
    return userPackageModel.create(newUserPackage);
}

async function update(updateUserPackage, id) {
    return userPackageModel.update(updateUserPackage, { where: { id: id } });
}

async function destroy(id) {
    return userPackageModel.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    getUserPackageById: showById,
    addNewUserPackage: create,
    updateUserPackageById: update,
    deleteUserPackageById: destroy,
};
