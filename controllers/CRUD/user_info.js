const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const userInfos = await models.UserInfo.findAll();
    return userInfos
}

async function showById(id){
    const userInfo = await models.UserInfo.findByPk(id)
    return userInfo
}

async function create(newUserInfo){
    await models.UserInfo.create(newUserInfo)
}

async function update(id,updateUserInfo){
    await models.UserInfo.update(updateUserInfo, {where: {id:id}})
}

async function destroy(id){
    await models.UserInfo.destroy({where:{id:id}})
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}