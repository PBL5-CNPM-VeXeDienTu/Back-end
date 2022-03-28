const models = require('../../models');

async function index(){
    return await models.ParkingLot.findAll();
}

async function showById(id){
    return await models.ParkingLot.findByPk(id);
}

async function create(newParkingLot){
    await models.ParkingLot.create(newParkingLot);
}

async function update(id,updateParkingLot){
    await models.ParkingLot.update(_updateParkingLot, {where: {id:id}});
}

async function destroy(id){
    await models.ParkingLot.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}