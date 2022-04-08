const parkingHistoryModel = require(process.cwd() +
    '/models/index').ParkingHistory;

async function index() {
    return parkingHistoryModel.findAll();
}

async function showById(id) {
    return parkingHistoryModel.findByPk(id);
}

async function create(newParkingHistory) {
    return parkingHistoryModel.create(newParkingHistory);
}

async function update(updateParkingHistory, id) {
    return parkingHistoryModel.update(updateParkingHistory, {
        where: { id: id },
    });
}

async function destroy(id) {
    return parkingHistoryModel.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    getParkingHistoryById: showById,
    addNewParkingHistory: create,
    updateParkingHistoryById: update,
    deleteParkingHistoryById: destroy,
};
