const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            type_name: { [Op.like]: `%${params.txt_search}%` },
        }),
        createdAt: {
            [Op.between]: [params.created_from_date, params.created_to_date],
        },
        updatedAt: {
            [Op.between]: [params.updated_from_date, params.updated_to_date],
        },
    })
    return models.TransactionType.findAndCountAll({
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['type_name', 'ASC'],
        ],
        where: selection,
    })
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
    return !!(await models.TransactionType.findOne({
        where: {
            type_name: typeName,
        },
    }))
}

module.exports = {
    getListTransactionTypes: index,
    getTransactionTypeById: showById,
    addNewTransactionType: create,
    updateTransactionTypeById: update,
    deleteTransactionTypeById: destroy,
    checkTypeNameExisted: checkTypeNameExisted,
}
