const featureModel = require(process.cwd() + '/models/index').Feature

async function index() {
    return featureModel.findAndCountAll()
}

async function showById(id) {
    return featureModel.findByPk(id)
}

async function create(newFeature) {
    return featureModel.create(newFeature)
}

async function update(updateFeature, id) {
    return featureModel.update(updateFeature, { where: { id: id } })
}

async function destroy(id) {
    return featureModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getFeatureById: showById,
    addNewFeature: create,
    updateFeatureById: update,
    deleteFeatureById: destroy,
}
