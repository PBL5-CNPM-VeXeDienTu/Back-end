const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

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
        required: true,
    },
    {
        model: models.FeedbackType,
        attributes: ['type_name'],
        require: true,
    },
    {
        model: models.Feature,
        attributes: ['name'],
        require: true,
    },
]

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$FeedbackType.type_name$': { [Op.like]: `%${params.txt_search}%` },
            '$Feature.name$': { [Op.like]: `%${params.txt_search}%` },
            content: { [Op.like]: `%${params.txt_search}%` },
        }),
        type_id: params.type_id !== '' ? params.type_id : null,
        feature_id: params.feature_id !== '' ? params.feature_id : null,
        is_processed: params.is_processed !== '' ? params.is_processed : null,
    })

    return models.Feedback.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: selection,
    })
}

async function indexByUserId(userId, startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            '$FeedbackType.type_name$': { [Op.like]: `%${params.txt_search}%` },
            '$Feature.name$': { [Op.like]: `%${params.txt_search}%` },
            content: { [Op.like]: `%${params.txt_search}%` },
        }),
        type_id: params.type_id !== '' ? params.type_id : null,
        feature_id: params.feature_id !== '' ? params.feature_id : null,
        is_processed: params.is_processed !== '' ? params.is_processed : null,
        user_id: userId,
    })

    return models.Feedback.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: selection,
    })
}

async function showById(id) {
    return models.Feedback.findByPk(id, {
        include: include,
    })
}

async function create(newFeedback) {
    return models.Feedback.create(newFeedback)
}

async function update(updateFeedback, id) {
    return models.Feedback.update(updateFeedback, { where: { id: id } })
}

async function destroy(id) {
    return models.Feedback.destroy({ where: { id: id } })
}

async function checkOwner(feedbackId, userId) {
    return !!(await models.Feedback.findOne({
        where: { id: feedbackId, user_id: userId },
    }))
}

module.exports = {
    getListFeedbacks: index,
    getListFeedbackByUserId: indexByUserId,
    getFeedbackById: showById,
    addNewFeedback: create,
    updateFeedbackById: update,
    deleteFeedbackById: destroy,
    checkUserOwnFeedback: checkOwner,
}
