const transactionModel = require(process.cwd() + '/models/index').Transaction

async function index() {
    return transactionModel.findAndCountAll()
}

async function showById(id) {
    return transactionModel.findByPk(id)
}

async function create(newTransaction) {
    return transactionModel.create(newTransaction)
}

async function update(updateTransaction, id) {
    return transactionModel.update(updateTransaction, { where: { id: id } })
}

async function destroy(id) {
    return transactionModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getTransactionById: showById,
    addNewTransaction: create,
    updateTransactionById: update,
    deleteTransactionById: destroy,
}
