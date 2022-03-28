const models = require('../../models');

async function index(){
    return await models.Vehicle.findAll();
}

async function showById(id){
    return await models.Vehicle.findByPk(id);
}

async function create(newVehicle){
    await models.Vehicle.create(newVehicle);
}

async function update(id,updateVehicle){
    await models.Vehicle.update(_updateVehicle, {where: {id:id}});
}

async function destroy(id){
    await models.Vehicle.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}