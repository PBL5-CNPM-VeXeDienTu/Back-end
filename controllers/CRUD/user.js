const models = require('../../models');

async function index(){
    return await models.User.findAll();
}

async function showById(id){
    return await models.User.findByPk(id);
}

async function create(newUser){
    await models.User.create(newUser);
}

async function update(id,updateUser){
    await models.User.update(updateUser, {where: {id:id}});
}

async function destroy(id){
    await models.User.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}