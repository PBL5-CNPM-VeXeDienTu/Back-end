const validators = require(process.cwd() + '/helpers/validators')

const {
    getPackageById,
    getPackageByParkingLotId,
    getPackageByParkingLotIdAndVehicleTypeIdAndPackageType,
    addNewPackage,
    updatePackageById,
    deletePackageById,
} = require('../CRUD/package')

async function indexByParkingLotId(request, response) {
    try {
        const parkingLotId = request.params.id

        const queryResult = await getPackageByParkingLotId(parkingLotId)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const packageId = request.params.id
        const dbPackage = await getPackageById(packageId)
        return response.status(200).json(dbPackage)
    } catch (error) {
        return response.status(500).json({
            message: 'Some thing went wrong !',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const newPackage = {
            parking_lot_id: request.userData.userId,
            name: request.body.name,
            type_id: request.body.type_id,
            vehicle_type_id: request.body.vehicle_type_id,
            price: request.body.price,
        }

        const validateResponse = validators.validatePackage(newPackage)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }
        const dbPackage =
            await getPackageByParkingLotIdAndVehicleTypeIdAndPackageType(
                newPackage.parking_lot_id,
                newPackage.vehicle_type_id,
                newPackage.type_id,
            )
        if (dbPackage) {
            updatePackageById(
                dbPackage.id,
                newPackage.name,
                newPackage.price,
            ).then((_) => {
                return response.status(404).json({
                    message: 'Update price,name successfully!',
                })
            })
        } else {
            addNewPackage(newPackage).then((_) => {
                return response.status(404).json({
                    message: 'Create Package successfully!',
                })
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const packageId = request.params.id
        const dbPackage = await getPackageById(packageId)
        if (dbPackage) {
            const updatePackage = {
                parking_lot_id: request.userData.userId,
                name: request.body.name,
                type_id: request.body.type_id,
                vehicle_type_id: request.body.vehicle_type_id,
                price: request.body.price,
            }
            const validateResponse = validator.validatePackage(updatePackage)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update Package data
            updatePackageById(updatePackage, dbPackage.id).then((_) => {
                return response.status(201).json({
                    message: 'Update package successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Package not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function deleteById(request, response) {
    try {
        const packageId = request.params.id
        const dbPackage = await getPackageById(packageId)
        if (dbPackage) {
            deletePackageById(dbPackage.id)
            return response.status(200).json({
                message: 'Delete package successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Package not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong !',
            error: error,
        })
    }
}

module.exports = {
    indexByParkingLotId: indexByParkingLotId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
