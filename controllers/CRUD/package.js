const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const Packages = await models.Package.findAll();
    return Packages
}

async function showById(id){
    const Package = await models.Package.findByPk(id)
    return Package
}

async function create(newPackage){
    await models.Package.create(newPackage)
}

async function update(id,updatePackage){
    await models.Package.update(_updatePackage, {where: {id:id}})
}

async function destroy(id){
    await models.Package.destroy({where:{id:id}})
}

// const example ={
//     parking_lot_id: 1,
//     name: 'Ưu đãi vé xe tháng',
//     type_id: 2,
//     price: 45000,

// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}