const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const wallets = await models.Wallet.findAll();
    return wallets
}

async function showById(id){
    const wallet = await models.Wallet.findByPk(id)
    return wallet
}

async function create(newWallet){
    await models.Wallet.create(newWallet)
}

async function update(id,updateWallet){
    await models.Wallet.update(_updateWallet, {where: {id:id}})
}

async function destroy(id){
    await models.Wallet.destroy({where:{id:id}})
}

// const example ={
//     user_id: 3,
//     balance: 5000000,
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}