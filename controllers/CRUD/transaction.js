const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const transactions = await models.Transaction.findAll();
    return transactions
}

async function showById(id){
    const transaction = await models.Transaction.findByPk(id)
    return transaction
}

async function create(newTransaction){
    await models.Transaction.create(newTransaction)
}

async function update(id,updateTransaction){
    await models.Transaction.update(_updateTransaction, {where: {id:id}})
}

async function destroy(id){
    await models.Transaction.destroy({where:{id:id}})
}

const example ={
    wallet_id: 1,
    type_id: 1,
    reference_id: 1,
    amount: 2,
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}