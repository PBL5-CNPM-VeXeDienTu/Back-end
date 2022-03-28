const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const parkingHistorys = await models.ParkingHistory.findAll();
    return parkingHistorys
}

async function showById(id){
    const parkingHistory = await models.ParkingHistory.findByPk(id)
    return parkingHistory
}

async function create(newParkingHistory){
    await models.ParkingHistory.create(newParkingHistory)
}

async function update(id,updateParkingHistory){
    await models.ParkingHistory.update(_updateParkingHistory, {where: {id:id}})
}

async function destroy(id){
    await models.ParkingHistory.destroy({where:{id:id}})
}

// const example ={
//     user_id: 3,
//     vehicle_id: 1,
//     parking_lot_id: 1,
//     checkin_time: new Date(2022, 3, 28, 12, 0, 0),
//     checkout_time: new Date(2022, 3, 28, 13, 0, 0),
//     is_parking: false,
//     memo: "",
//     cost: 5000,
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}