const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            name: { [Op.like]: `%${params.txt_search}%` },
        }),
        createdAt: {
            [Op.between]: [params.created_from_date, params.created_to_date],
        },
        updatedAt: {
            [Op.between]: [params.updated_from_date, params.updated_to_date],
        },
    })
    return models.Feature.findAndCountAll({
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['name', 'ASC'],
        ],
        where: selection,
    })
}

async function showById(id) {
    return models.Feature.findByPk(id)
}

async function create(newFeature) {
    return models.Feature.create(newFeature)
}

async function update(updateFeature, id) {
    return models.Feature.update(updateFeature, { where: { id: id } })
}

async function destroy(id) {
    return models.Feature.destroy({ where: { id: id } })
}

async function checkNameExisted(typeName) {
    return !!(await models.Feature.findOne({
        where: {
            type_name: typeName,
        },
    }))
}

module.exports = {
    getListFeatureTypes: index,
    getFeatureById: showById,
    addNewFeature: create,
    updateFeatureById: update,
    deleteFeatureById: destroy,
    checkNameExisted: checkNameExisted,
}
