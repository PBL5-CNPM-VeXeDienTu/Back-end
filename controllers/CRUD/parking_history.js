const models = require('../../models');

async function index() {
    return await models.ParkingHistory.findAll();
}

async function showById(id) {
    return await models.ParkingHistory.findByPk(id);
}

async function create(newParkingHistory) {
    await models.ParkingHistory.create(newParkingHistory);
}

async function update(id, updateParkingHistory) {
    await models.ParkingHistory.update(_updateParkingHistory, {
        where: { id: id },
    });
}

async function destroy(id) {
    await models.ParkingHistory.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
