const models = require('../../models');

async function index() {
    return await models.FeedbackType.findAll();
}

async function showById(id) {
    return await models.FeedbackType.findByPk(id);
}

async function create(newFeedbackType) {
    await models.FeedbackType.create(newFeedbackType);
}

async function update(id, updateFeedbackType) {
    await models.FeedbackType.update(updateFeedbackType, { where: { id: id } });
}

async function destroy(id) {
    await models.FeedbackType.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
