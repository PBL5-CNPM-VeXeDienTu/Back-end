const verifyStateModel = require(process.cwd() + '/models/index').VerifyState

async function index() {
    return verifyStateModel.findAndCountAll()
}

async function showById(id) {
    return verifyStateModel.findByPk(id)
}

async function create(newVerifyState) {
    return verifyStateModel.create(newVerifyState)
}

async function update(updateVerifyState, id) {
    return verifyStateModel.update(updateVerifyState, { where: { id: id } })
}

async function destroy(id) {
    return verifyStateModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getVerifyStateById: showById,
    addNewVerifyState: create,
    updateVerifyStateById: update,
    deleteVerifyStateById: destroy,
}
