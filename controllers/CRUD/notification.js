const notificationModel = require(process.cwd() + '/models/index').Notification;

async function index(){
    return notificationModel.findAll()
}

async function showById(id){
    return notificationModel.findByPk(id);
}

async function create(newNotification){
    notificationModel.create(newNotification);
}

async function update(id,updateNotification){
    notificationModel.update(_updateNotification, {where: {id:id}});
}

async function destroy(id){
    notificationModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getNotificationById: showById,
    addNewNotification: create,
    updateNotificationById: update,
    deleteNotificationById: destroy
}
