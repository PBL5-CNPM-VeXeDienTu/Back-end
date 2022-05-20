const models = require(process.cwd() + '/models/index')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const include = [
    {
        model: models.ParkingLot,
        attributes: { exclude: ['id'] },
        include: [
            {
                model: models.User,
                attributes: { exclude: ['password', 'qr_key', 'updatedAt'] },
                include: [
                    {
                        model: models.Role,
                        attributes: ['name'],
                    },
                ],
                as: 'Owner',
                required: true,
            },
        ],
        required: true,
    },
    {
        model: models.PackageType,
        attributes: ['type_name'],
        required: true,
    },
    {
        model: models.VehicleType,
        attributes: ['type_name'],
        required: true,
    },
]

async function index() {
    return models.Package.findAll()
}

async function showById(id) {
    return models.Package.findByPk(id, {
        include: include,
    })
}

async function showByParkingLotId(parkingLotId) {
    return models.Package.findAll({
        include: include,
        order: [
            ['id', 'DESC'],
            ['price', 'DESC'],
        ],
        where: { parking_lot_id: parkingLotId },
    })
}

async function showByParkingLotIdAndVehicleTypeIdAndPackageType(
    parkingLotId,
    vehicleTypeId,
    packageTypeId,
) {
    return models.ParkingPrice.findOne({
        where: {
            parking_lot_id: parkingLotId,
            vehicle_type_id: vehicleTypeId,
            type_id: packageTypeId,
        },
    })
}

async function create(newPackage) {
    return models.Package.create(newPackage)
}

async function update(updatePackage, id) {
    return models.Package.update(updatePackage, { where: { id: id } })
}

async function destroy(id) {
    return packageModel.destroy({ where: { id: id } })
}

module.exports = {
    index: index,
    getPackageById: showById,
    getPackageByParkingLotId: showByParkingLotId,
    getPackageByParkingLotIdAndVehicleTypeIdAndPackageType:
        showByParkingLotIdAndVehicleTypeIdAndPackageType,
    addNewPackage: create,
    updatePackageById: update,
    deletePackageById: destroy,
}
