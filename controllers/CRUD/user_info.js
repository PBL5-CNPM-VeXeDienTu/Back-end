const userInfoModel = require(process.cwd() + '/models/index').UserInfo

async function index() {
    return userInfoModel.findAll()
}

async function showByUserId(user_id) {
    return userInfoModel.findOne({ where: { id: user_id } })
}

async function create(newUserInfo) {
    return userInfoModel.create(newUserInfo)
}

async function update(updateUserInfo, id) {
    return userInfoModel.update(updateUserInfo, { where: { id: id } })
}

async function destroy(id) {
    return userInfoModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getUserInfoByUserId: showByUserId,
    addNewUserInfo: create,
    updateUserInfoById: update,
    deleteUserInfoById: destroy,
}
