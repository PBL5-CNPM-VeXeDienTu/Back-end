const userModel = require(process.cwd() + '/models/index').User;
const getCurrentDateTime = require(process.cwd() + '/helpers/get-current-datetime/datetime');

async function index() {
    return userModel.findAll();
}

async function showById(id) {
    return userModel.findByPk(id);
}

async function showByEmail(email) {
    userModel.findOne(email);
}

async function create(newUser) {
    userModel.create(newUser);
}

async function update(id, updateUser) {
    userModel.update(updateUser, {where: {id:id}});
}

async function destroy(id) {
    const now = getCurrentDateTime();
    
    // Update deletedAt field of user
    const updateUser = {
        deletedAt: now
    }
    update(id, updateUser);
}

module.exports = {
    index: index,
    getUserById: showById,
    getUserByEmail: showByEmail,
    addNewUser: create,
    updateUserById: update,
    softDeleteUserById: destroy
}