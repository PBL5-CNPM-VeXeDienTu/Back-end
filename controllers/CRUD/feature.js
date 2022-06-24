const models = require(process.cwd() + '/models/index')

async function index() {
    return models.Feature.findAndCountAll()
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

async function checkNameExisted(name) {
    return !!(await models.Feature.findOne({
        where: {
            name: name,
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
