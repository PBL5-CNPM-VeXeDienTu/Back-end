const notificationModel = require(process.cwd() + '/models/index').Notification

async function index() {
    return notificationModel.findAndCountAll()
}

async function showById(id) {
    return notificationModel.findByPk(id)
}

async function create(newNotification) {
    return notificationModel.create(newNotification)
}

async function update(updateNotification, id) {
    return notificationModel.update(updateNotification, { where: { id: id } })
}

async function destroy(id) {
    return notificationModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getNotificationById: showById,
    addNewNotification: create,
    updateNotificationById: update,
    deleteNotificationById: destroy,
}
