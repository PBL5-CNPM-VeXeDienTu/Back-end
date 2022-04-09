const userModel = require(process.cwd() + '/models/index').User;
const getCurrentDateTime = require(process.cwd() +
    '/helpers/get-current-datetime/datetime');

async function index() {
    return userModel.findAll();
}

async function showById(id) {
    return userModel.findByPk(id);
}

async function showByEmail(email) {
    return userModel.findOne({ where: { email: email } });
}

async function create(newUser) {
    return userModel.create(newUser);
}

async function update(updateUser, id) {
    return userModel.update(updateUser, { where: { id: id } });
}

async function destroy(id) {
    const now = getCurrentDateTime();

    // Update deletedAt field of user
    const updateUser = {
        deletedAt: now,
    };
    await update(updateUser, id);
}

module.exports = {
    index: index,
    getUserById: showById,
    getUserByEmail: showByEmail,
    addNewUser: create,
    updateUserById: update,
    softDeleteUserById: destroy,
};
