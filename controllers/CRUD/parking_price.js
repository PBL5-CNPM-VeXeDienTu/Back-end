const models = require('../../models');

async function index() {
    return await models.ParkingPrice.findAll();
}

async function showById(id) {
    return await models.ParkingPrice.findByPk(id);
}

async function create(newParkingPrice) {
    await models.ParkingPrice.create(newParkingPrice);
}

async function update(id, updateParkingPrice) {
    await models.ParkingPrice.update(_updateParkingPrice, {
        where: { id: id },
    });
}

async function destroy(id) {
    await models.ParkingPrice.destroy({ where: { id: id } });
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy,
};
