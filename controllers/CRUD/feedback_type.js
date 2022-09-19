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
    return models.FeedbackType.findAndCountAll(
        objectCleaner.clean({
            offset: Number.isNaN(startIndex) ? null : startIndex,
            limit: Number.isNaN(limit) ? null : limit,
            order: [
                ['id', 'DESC'],
                ['type_name', 'ASC'],
            ],
            where: selection,
        }),
    )
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
