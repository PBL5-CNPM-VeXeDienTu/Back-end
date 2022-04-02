const transactionTypeModel = require(process.cwd() + '/models/index').TransactionType;

async function index(){
    return transactionTypeModel.findAll();
}

async function showById(id){
    return transactionTypeModel.findByPk(id);
}

async function create(newTransactionType){
    transactionTypeModel.create(newTransactionType);
}

async function update(id,updateTransactionType){
    transactionTypeModel.update(updateTransactionType, {where: {id:id}});
}

async function destroy(id){
    transactionTypeModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getTransactionTypeById: showById,
    addNewTransactionType: create,
    updateTransactionTypeById: update,
    deleteTransactionTypeById: destroy
}
