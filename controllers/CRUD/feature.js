const featureModel = require(process.cwd() + '/models/index').Feature;

async function index(){
    return featureModel.findAll();
}

async function showById(id){
    return featureModel.findByPk(id);
}

async function create(newFeature){
    featureModel.create(newFeature);
}

async function update(id,updateFeature){
    featureModel.update(updateFeature, {where: {id:id}});
}

async function destroy(id){
    featureModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getFeatureById: showById,
    addNewFeature: create,
    updateFeatureById: update,
    deleteFeatureById: destroy
}
