const models = require('../../models');

async function index(){
    return await models.Package.findAll();
}

async function showById(id){
    return await models.Package.findByPk(id);
}

async function create(newPackage){
    await models.Package.create(newPackage);
}

async function update(id,updatePackage){
    await models.Package.update(_updatePackage, {where: {id:id}});
}

async function destroy(id){
    await models.Package.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}