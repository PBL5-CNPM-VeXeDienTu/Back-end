const parkingLotModel = require(process.cwd() + '/models/index').ParkingLot;
const getCurrentDateTime = require(process.cwd() + '/helpers/get-current-datetime/datetime');

async function index(){
    return parkingLotModel.findAll();
}

async function showById(id){
    return parkingLotModel.findByPk(id);
}

async function showByName(name) {
    parkingLotModel.findOne(name);
}

async function create(newParkingLot){
    parkingLotModel.create(newParkingLot);
}

async function update(id,updateParkingLot){
    parkingLotModel.update(_updateParkingLot, {where: {id:id}});
}

async function destroy(id){
    const now = getCurrentDateTime();
    
    // Update deletedAt field of parking-lot
    const updateParkingLot = {
        deletedAt: now
    }
    update(id, updateParkingLot);
}

module.exports = {
    index: index,
    getParkingLotById: showById,
    getParkingLotByName: showByName,
    addNewParkingLot: create,
    updateParkingLotById: update,
    softDeleteParkingLotById: destroy
}
