const vehicleModel = require(process.cwd() + '/models/index').Vehicle;
const getCurrentDateTime = require(process.cwd() + '/helpers/get-current-datetime/datetime');

async function index(){
    return vehicleModel.findAll();
}

async function showById(id){
    return vehicleModel.findByPk(id);
}

async function showByUserId(owner_id) {
    userModel.findOne(owner_id);
}

async function create(newVehicle){
    vehicleModel.create(newVehicle);
}

async function update(id,updateVehicle){
    vehicleModel.update(_updateVehicle, {where: {id:id}});
}

async function destroy(id){
    const now = getCurrentDateTime();
    
    // Update deletedAt field of vehicle
    const updateVehicle = {
        deletedAt: now
    }
    update(id, updateVehicle);
}

module.exports = {
    index: index,
    getVehicleById: showById,
    getVehicleByUserId: showByUserId,
    addNewVehicle: create,
    updateVehicleById: update,
    softDeleteVehicleById: destroy
}
