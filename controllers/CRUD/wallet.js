const models = require('../../models');

async function index(){
    return await models.Wallet.findAll();
}

async function showById(id){
    return await models.Wallet.findByPk(id);
}

async function create(newWallet){
    await models.Wallet.create(newWallet);
}

async function update(id,updateWallet){
    await models.Wallet.update(_updateWallet, {where: {id:id}});
}

async function destroy(id){
    await models.Wallet.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}