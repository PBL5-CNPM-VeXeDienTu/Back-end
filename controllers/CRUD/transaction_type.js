const models = require('../../models');

async function index(){
    return await models.TransactionType.findAll();
}

async function showById(id){
    return await models.TransactionType.findByPk(id);
}

async function create(newTransactionType){
    await models.TransactionType.create(newTransactionType);
}

async function update(id,updateTransactionType){
    await models.TransactionType.update(updateTransactionType, {where: {id:id}});
}

async function destroy(id){
    await models.TransactionType.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}