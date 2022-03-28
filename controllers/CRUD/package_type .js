const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const packageTypes = await models.PackageType.findAll();
    return packageTypes
}

async function showById(id){
    const packageType = await models.PackageType.findByPk(id)
    return packageType
}

async function create(newPackageType){
    await models.PackageType.create(newPackageType)
}

async function update(id,updatePackageType){
    await models.PackageType.update(updatePackageType, {where: {id:id}})
}

async function destroy(id){
    await models.PackageType.destroy({where:{id:id}})
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}