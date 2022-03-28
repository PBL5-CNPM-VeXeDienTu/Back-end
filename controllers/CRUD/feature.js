const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const features = await models.Feature.findAll();
    return features
}

async function showById(id){
    const feature = await models.Feature.findByPk(id)
    return feature
}

async function create(newFeature){
    await models.Feature.create(newFeature)
}

async function update(id,updateFeature){
    await models.Feature.update(updateFeature, {where: {id:id}})
}

async function destroy(id){
    await models.Feature.destroy({where:{id:id}})
}


module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}