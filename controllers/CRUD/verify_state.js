const models = require('../../models');

async function index() {
    return await models.VerifyState.findAll();
}

async function showById(id) {
    return await models.VerifyState.findByPk(id);
}

async function create(newVerifyState) {
    await models.VerifyState.create(newVerifyState);
}

async function update(id, updateVerifyState) {
    await models.VerifyState.update(_updateVerifyState, { where: { id: id } });
}

async function destroy(id) {
    await models.VerifyState.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
