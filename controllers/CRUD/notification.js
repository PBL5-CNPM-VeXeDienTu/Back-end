const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const notifications = await models.Notification.findAll();
    return notifications
}

async function showById(id){
    const notification = await models.Notification.findByPk(id)
    return notification
}

async function create(newNotification){
    await models.Notification.create(newNotification)
}

async function update(id,updateNotification){
    await models.Notification.update(_updateNotification, {where: {id:id}})
}

async function destroy(id){
    await models.Notification.destroy({where:{id:id}})
}

// const example ={
//     user_id: 3,
//     title: 'Quản lí ví cá nhân',
//     content: 'Ví của bạn sắp hết tiền :(',
//     is_read: false,
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}