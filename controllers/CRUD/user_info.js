const userInfoModel = require(process.cwd() + '/models/index').UserInfo

async function index() {
    return userInfoModel.findAndCountAll()
}

async function showByUserId(userId) {
    return userInfoModel.findOne({ where: { user_id: userId } })
}

async function create(newUserInfo) {
    return userInfoModel.create(newUserInfo)
}

async function update(updateUserInfo, userId) {
    return userInfoModel.update(updateUserInfo, { where: { user_id: userId } })
}

async function destroy(userId) {
    return userInfoModel.destroy({ where: { user_id: userId } })
}

module.exports = {
    index: index,
    getUserInfoByUserId: showByUserId,
    addNewUserInfo: create,
    updateUserInfoByUserId: update,
    deleteUserInfoByUserId: destroy,
}
