const models = require(process.cwd() + '/models/index')

async function index() {
    return models.FeedbackType.findAndCountAll()
}

async function showById(id) {
    return models.FeedbackType.findByPk(id)
}

async function create(newFeedbackType) {
    return models.FeedbackType.create(newFeedbackType)
}

async function update(updateFeedbackType, id) {
    return models.FeedbackType.update(updateFeedbackType, { where: { id: id } })
}

async function destroy(id) {
    return models.FeedbackType.destroy({ where: { id: id } })
}

async function checkTypeNameExisted(typeName) {
    return !!(await models.FeedbackType.findOne({
        where: {
            type_name: typeName,
        },
    }))
}

module.exports = {
    getListFeedbackTypes: index,
    getFeedbackTypeById: showById,
    addNewFeedbackType: create,
    updateFeedbackTypeById: update,
    deleteFeedbackTypeById: destroy,
    checkTypeNameExisted: checkTypeNameExisted,
}
