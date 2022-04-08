const parkingPriceModel = require(process.cwd() + '/models/index').ParkingPrice;

async function index() {
    return parkingPriceModel.findAll();
}

async function showById(id) {
    return parkingPriceModel.findByPk(id);
}

async function create(newParkingPrice) {
    return parkingPriceModel.create(newParkingPrice);
}

async function update(updateParkingPrice, id) {
    return parkingPriceModel.update(updateParkingPrice, { where: { id: id } });
}

async function destroy(id) {
    return parkingPriceModel.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    getParkingPriceById: showById,
    addNewParkingPrice: create,
    updateParkingPriceById: update,
    deleteParkingPriceById: destroy,
};
