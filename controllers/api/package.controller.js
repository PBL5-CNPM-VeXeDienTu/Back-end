const validators = require(process.cwd() + '/helpers/validators')

const {
    getListPackages,
    getPackageById,
    getPackageByParkingLotId,
    addNewPackage,
    updatePackageById,
    deletePackageById,
} = require('../CRUD/package')

async function index(request, response) {
    try {
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)

        if (
            Number.isNaN(page) ||
            page < 1 ||
            Number.isNaN(limit) ||
            limit < 0
        ) {
            return response.status(400).json({
                message: 'Invalid query parameters!',
            })
        }

        const startIndex = (page - 1) * limit

        const queryResult = await getListPackages(startIndex, limit)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

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
    index: index,
    indexByParkingLotId: indexByParkingLotId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}