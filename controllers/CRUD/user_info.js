const userInfoModel = require(process.cwd() + '/models/index').UserInfo;

async function index(){
    return userInfoModel.findAll();
}

async function showById(id){
    return userInfoModel.findByPk(id);
}

async function create(newUserInfo){
    userInfoModel.create(newUserInfo);
}

async function update(id,updateUserInfo){
    userInfoModel.update(updateUserInfo, {where: {id:id}});
}

async function destroy(id){
    userInfoModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getUserInfoById: showById,
    addNewUserInfo: create,
    updateUserInfoById: update,
    deleteUserInfoById: destroy
}
