const models = require(process.cwd() + '/models/index')

async function index() {
    return models.TransactionType.findAndCountAll()
}

async function showById(id) {
    return models.TransactionType.findByPk(id)
}

async function create(newTransactionType) {
    return models.TransactionType.create(newTransactionType)
}

async function update(updateTransactionType, id) {
    return models.TransactionType.update(updateTransactionType, {
        where: { id: id },
    })
}

async function destroy(id) {
    return models.TransactionType.destroy({ where: { id: id } })
}

async function checkTypeNameExisted(typeName) {
    return models.TransactionType.findOne({
        where: {
            type_name: typeName,
        },
    })
}

module.exports = {
    getListTransactionTypes: index,
    getTransactionTypeById: showById,
    addNewTransactionType: create,
    updateTransactionTypeById: update,
    deleteTransactionTypeById: destroy,
    checkTypeNameExisted: checkTypeNameExisted,
}
