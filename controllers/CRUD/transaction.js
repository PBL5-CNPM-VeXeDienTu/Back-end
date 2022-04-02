const transactionModel = require(process.cwd() + '/models/index').Transaction;

async function index(){
    return transactionModel.findAll();
}

async function showById(id){
    return transactionModel.findByPk(id);
}

async function create(newTransaction){
    transactionModel.create(newTransaction);
}

async function update(id,updateTransaction){
    transactionModel.update(_updateTransaction, {where: {id:id}});
}

async function destroy(id){
    transactionModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getTransactionById: showById,
    addNewTransaction: create,
    updateTransactionById: update,
    deleteTransactionById: destroy
}
