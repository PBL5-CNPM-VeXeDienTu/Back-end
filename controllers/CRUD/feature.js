const models = require('../../models');

async function index(){
    return await models.Feature.findAll();
}

async function showById(id){
    return await models.Feature.findByPk(id);
}

async function create(newFeature){
    await models.Feature.create(newFeature);
}

async function update(id,updateFeature){
    await models.Feature.update(updateFeature, {where: {id:id}});
}

async function destroy(id){
    await models.Feature.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}