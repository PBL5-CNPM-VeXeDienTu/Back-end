const userModel = require(process.cwd() + '/models/index').User
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

async function index(columns, startIndex, limit) {
    return userModel.findAll({
        attributes: columns,
        offset: startIndex,
        limit: limit,
    })
}

async function showById(id) {
    return userModel.findByPk(id)
}

async function showByEmail(email) {
    return userModel.findOne({ where: { email: email } })
}

async function create(newUser) {
    return userModel.create(newUser)
}

async function update(updateUser, id) {
    return userModel.update(updateUser, { where: { id: id } })
}

async function destroy(id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of user
    const updateUser = {
        deletedAt: now,
    }
    await update(updateUser, id)
}

async function checkValidAccount(id) {
    const dbUser = await showById(id)
    return {
        is_valid: dbUser.is_verified && dbUser.deletedAt == null,
        message: !dbUser.is_verified
            ? 'This email is not verified yet!'
            : 'This user was deleted!',
    }
}

module.exports = {
    getListUsers: index,
    getUserById: showById,
    getUserByEmail: showByEmail,
    addNewUser: create,
    updateUserById: update,
    softDeleteUserById: destroy,
    checkValidAccount: checkValidAccount,
}
