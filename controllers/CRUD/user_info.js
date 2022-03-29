const models = require('../../models');

async function index() {
    return await models.UserInfo.findAll();
}

async function showById(id) {
    return await models.UserInfo.findByPk(id);
}

async function create(newUserInfo) {
    await models.UserInfo.create(newUserInfo);
}

async function update(id, updateUserInfo) {
    await models.UserInfo.update(updateUserInfo, { where: { id: id } });
}

async function destroy(id) {
    await models.UserInfo.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
