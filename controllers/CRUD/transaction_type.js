const transactionTypeModel = require(process.cwd() +
    '/models/index').TransactionType

async function index() {
    return transactionTypeModel.findAndCountAll()
}

async function showById(id) {
    return transactionTypeModel.findByPk(id)
}

async function create(newTransactionType) {
    return transactionTypeModel.create(newTransactionType)
}

async function update(updateTransactionType, id) {
    return transactionTypeModel.update(updateTransactionType, {
        where: { id: id },
    })
}

async function destroy(id) {
    return transactionTypeModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getTransactionTypeById: showById,
    addNewTransactionType: create,
    updateTransactionTypeById: update,
    deleteTransactionTypeById: destroy,
}
