const models = require('../../models');

async function index() {
    return await models.Transaction.findAll();
}

async function showById(id) {
    return await models.Transaction.findByPk(id);
}

async function create(newTransaction) {
    await models.Transaction.create(newTransaction);
}

async function update(id, updateTransaction) {
    await models.Transaction.update(_updateTransaction, { where: { id: id } });
}

async function destroy(id) {
    await models.Transaction.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
