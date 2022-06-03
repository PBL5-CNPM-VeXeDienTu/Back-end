const roleModel = require(process.cwd() + '/models/index').Role

async function index() {
    return roleModel.findAll()
}

module.exports = {
    getListRoles: index,
}
