const walletModel = require(process.cwd() + '/models/index').Wallet;

async function index(){
    return walletModel.findAll();
}

async function showById(id){
    return walletModel.findByPk(id);
}

async function create(newWallet){
    walletModel.create(newWallet);
}

async function update(id,updateWallet){
    walletModel.update(_updateWallet, {where: {id:id}});
}

async function destroy(id){
    walletModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getWalletById: showById,
    addNewWallet: create,
    updateWalletById: update,
    deleteWalletById: destroy
}
