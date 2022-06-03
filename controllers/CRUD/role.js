const roleModel = require(process.cwd() + '/models/index').Role

async function index() {
    return roleModel.findAll()
}

async function showById(id) {
    return roleModel.findByPk(id)
}

module.exports = {
    getListRoles: index,
    getRoleById: showById,
}
