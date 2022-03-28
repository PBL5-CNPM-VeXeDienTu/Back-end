const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const transactionTypes = await models.TransactionType.findAll();
    return transactionTypes
}

async function showById(id){
    const transactionType = await models.TransactionType.findByPk(id)
    return transactionType
}

async function create(newTransactionType){
    await models.TransactionType.create(newTransactionType)
}

async function update(id,updateTransactionType){
    await models.TransactionType.update(updateTransactionType, {where: {id:id}})
}

async function destroy(id){
    await models.TransactionType.destroy({where:{id:id}})
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}