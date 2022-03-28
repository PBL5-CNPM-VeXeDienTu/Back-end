const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const parkingLots = await models.ParkingLot.findAll();
    return parkingLots
}

async function showById(id){
    const parkingLot = await models.ParkingLot.findByPk(id)
    return parkingLot
}

async function create(newParkingLot){
    await models.ParkingLot.create(newParkingLot)
}

async function update(id,updateParkingLot){
    await models.ParkingLot.update(_updateParkingLot, {where: {id:id}})
}

async function destroy(id){
    await models.ParkingLot.destroy({where:{id:id}})
}
// const example = {
//  name: "Bãi đỗ xe Bến xe miền Tây",
// 	address: "55 Tôn Đức Thắng",
// 	avatar: null,
// 	capacity: 5500,
// 	is_open: true,
// 	is_full: false,
// 	owner_id: 5
// }


module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}