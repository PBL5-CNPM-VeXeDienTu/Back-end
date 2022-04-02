const parkingPriceModel = require(process.cwd() + '/models/index').ParkingPrice;

async function index(){
    return parkingPriceModel.findAll();
}

async function showById(id){
    return parkingPriceModel.findByPk(id);
}

async function create(newParkingPrice){
    parkingPriceModel.create(newParkingPrice);
}

async function update(id,updateParkingPrice){
    parkingPriceModel.update(_updateParkingPrice, {where: {id:id}});
}

async function destroy(id){
    parkingPriceModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getParkingPriceById: showById,
    addNewParkingPrice: create,
    updateParkingPriceById: update,
    deleteParkingPriceById: destroy
}
