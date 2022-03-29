const models = require('../../models');

async function index() {
    return await models.Notification.findAll();
}

async function showById(id) {
    return await models.Notification.findByPk(id);
}

async function create(newNotification) {
    await models.Notification.create(newNotification);
}

async function update(id, updateNotification) {
    await models.Notification.update(_updateNotification, {
        where: { id: id },
    });
}

async function destroy(id) {
    await models.Notification.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
