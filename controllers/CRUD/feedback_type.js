const feedbackTypeModel = require(process.cwd() + '/models/index').FeedbackType

async function index() {
    return feedbackTypeModel.findAndCountAll()
}

async function showById(id) {
    return feedbackTypeModel.findByPk(id)
}

async function create(newFeedbackType) {
    return feedbackTypeModel.create(newFeedbackType)
}

async function update(updateFeedbackType, id) {
    return feedbackTypeModel.update(updateFeedbackType, { where: { id: id } })
}

async function destroy(id) {
    return feedbackTypeModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getFeedbackTypeById: showById,
    addNewFeedbackType: create,
    updateFeedbackTypeById: update,
    deleteFeedbackTypeById: destroy,
}
