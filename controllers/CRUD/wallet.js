const models = require(process.cwd() + '/models/index')

const include = [
    {
        model: models.User,
        attributes: [
            'email',
            'name',
            'role',
            'is_verified',
            'deletedAt',
            'createdAt',
        ],
        include: [
            {
                model: models.Role,
                attributes: ['name'],
            },
        ],
        as: 'Owner',
        required: true,
    },
    {
        model: models.Transaction,
        include: [
            {
                model: models.TransactionType,
                attributes: ['type_name'],
            },
        ],
    },
]

async function index(startIndex, limit) {
    return models.Wallet.findAndCountAll({
        include: include,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        offset: startIndex,
        limit: limit,
        order: [['user_id', 'DESC']],
    })
}

async function showById(id) {
    return models.Wallet.findByPk(id, {
        include: include,
    })
}

async function showByUserId(userId) {
    return models.Wallet.findOne({
        include: include,
        where: { user_id: userId },
    })
}

async function create(newWallet) {
    return models.Wallet.create(newWallet)
}

async function update(updateWallet, id) {
    return models.Wallet.update(updateWallet, { where: { id: id } })
}

async function checkOwner(walletId, userId) {
    return !!(await models.Wallet.findOne({
        where: { id: walletId, user_id: userId },
    }))
}

module.exports = {
    getListWallets: index,
    getWalletById: showById,
    getWalletByUserId: showByUserId,
    addNewWallet: create,
    updateWalletById: update,
    checkUserOwnWallet: checkOwner,
}
