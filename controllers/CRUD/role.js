const roleModel = require(process.cwd() + '/models/index').Role

async function showById(id) {
    return roleModel.findByPk(id)
}

module.exports = {
    getRoleById: showById,
}
