const parkingLotModel = require(process.cwd() + '/models/index').ParkingLot
const getCurrentDateTime = require(process.cwd() +
    '/helpers/get-current-datetime/datetime')

async function index() {
    return parkingLotModel.findAll()
}

async function showById(id) {
    return parkingLotModel.findByPk(id)
}

async function showByName(name) {
    return parkingLotModel.findOne(name)
}

async function create(newParkingLot) {
    return parkingLotModel.create(newParkingLot)
}

async function update(updateParkingLot, id) {
    return parkingLotModel.update(updateParkingLot, { where: { id: id } })
}

async function destroy(id) {
    const now = getCurrentDateTime()

    // Update deletedAt field of parking-lot
    const updateParkingLot = {
        deletedAt: now,
    }
    await update(updateParkingLot, id)
}

module.exports = {
    index: index,
    getParkingLotById: showById,
    getParkingLotByName: showByName,
    addNewParkingLot: create,
    updateParkingLotById: update,
    softDeleteParkingLotById: destroy,
}
