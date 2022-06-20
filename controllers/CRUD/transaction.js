const { Op } = require('sequelize')

const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

const include = [
    {
        model: models.TransactionType,
        attributes: ['type_name'],
    },
]

async function indexByWalletId(walletId, startIndex, limit, params) {
    const selection = objectCleaner.clean({
        type_id: params.type_id !== '' ? params.type_id : null,
        amount:
            params.state !== ''
                ? params.state === 'Nạp tiền'
                    ? { [Op.gt]: 0 }
                    : { [Op.lt]: 0 }
                : null,
        createdAt: {
            [Op.between]: [params.from_date, params.to_date],
        },
        wallet_id: walletId,
    })

    console.log(selection)

    return models.Transaction.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        where: selection,
    })
}

async function showById(id) {
    return models.Transaction.findByPk(id, {
        include: include,
    })
}

async function create(newTransaction) {
    return models.Transaction.create(newTransaction)
}

async function update(updateTransaction, id) {
    return models.Transaction.update(updateTransaction, { where: { id: id } })
}

async function destroy(id) {
    return models.Transaction.destroy({ where: { id: id } })
}

module.exports = {
    getListTransactionsByWalletId: indexByWalletId,
    getTransactionById: showById,
    addNewTransaction: create,
    updateTransactionById: update,
    deleteTransactionById: destroy,
}
