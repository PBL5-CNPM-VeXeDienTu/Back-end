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

async function index(startIndex, limit) {
    return models.Feedback.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
    })
}

async function indexByUserId(userId, startIndex, limit) {
    return models.Feedback.findAndCountAll({
        include: include,
        offset: startIndex,
        limit: limit,
        order: [['id', 'DESC']],
        where: { user_id: userId },
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
