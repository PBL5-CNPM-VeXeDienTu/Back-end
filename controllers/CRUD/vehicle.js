const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const vehicles = await models.Vehicle.findAll();
    return vehicles
}

async function showById(id){
    const vehicle = await models.Vehicle.findByPk(id)
    return vehicle
}

async function create(newVehicle){
    await models.Vehicle.create(newVehicle)
}

async function update(id,updateVehicle){
    await models.Vehicle.update(_updateVehicle, {where: {id:id}})
}

async function destroy(id){
    await models.Vehicle.destroy({where:{id:id}})
}

// const example ={
//     license_plate:'F43-123',
//     vehicle_image: "vehicle_image",
//     cavet_image_front: "front43",
//     cavet_image_back: "back43",
//     type: "Sirius",
//     color: "white",
//     owner_id: 3,
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}