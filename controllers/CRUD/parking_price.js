const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const parkingPrices = await models.ParkingPrice.findAll();
    return parkingPrices
}

async function showById(id){
    const parkingPrice = await models.ParkingPrice.findByPk(id)
    return parkingPrice
}

async function create(newParkingPrice){
    await models.ParkingPrice.create(newParkingPrice)
}

async function update(id,updateParkingPrice){
    await models.ParkingPrice.update(_updateParkingPrice, {where: {id:id}})
}

async function destroy(id){
    await models.ParkingPrice.destroy({where:{id:id}})
}

// const example ={
//     parking_lot_id: 1,
//     bike: 1000,
//     motobike: 4000,
//     car: 10000,
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}