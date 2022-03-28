const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const userPackage = await models.UserPackage.findAll();
    return userPackage
}

async function showById(id){
    const userPackage = await models.UserPackage.findByPk(id)
    return userPackage
}

async function create(newUserPackage){
    await models.UserPackage.create(newUserPackage)
}

async function update(id,updateUserPackage){
    await models.UserPackage.update(_updateUserPackage, {where: {id:id}})
}

async function destroy(id){
    await models.UserPackage.destroy({where:{id:id}})
}

// const example ={
//     user_id: '2',
//     package_id: '1',
//     expire_at: new Date(2022, 4, 28, 13, 0, 0),
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}