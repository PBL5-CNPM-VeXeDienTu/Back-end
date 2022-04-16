const walletModel = require(process.cwd() + '/models/index').Wallet

async function index() {
    return walletModel.findAll()
}

async function showById(id) {
    return walletModel.findByPk(id)
}

async function create(newWallet) {
    return walletModel.create(newWallet)
}

async function update(updateWallet, id) {
    return walletModel.update(updateWallet, { where: { id: id } })
}

async function destroy(id) {
    return walletModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getWalletById: showById,
    addNewWallet: create,
    updateWalletById: update,
    deleteWalletById: destroy,
}
