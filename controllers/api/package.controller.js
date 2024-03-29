const validators = require(process.cwd() + '/helpers/validators')

const {
    getListPackages,
    getListPackagesByParkingLotId,
    getListPackagesByOwnerId,
    getPackageById,
    addNewPackage,
    updatePackageById,
    deletePackageById,
} = require('../CRUD/package')
const { checkUserOwnParkingLot } = require('../CRUD/parking_lot')

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

        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            type_id: request.query.type_id,
            vehicle_type_id: request.query.vehicle_type_id,
        }

        const queryResult = await getListPackages(startIndex, limit, params)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByOwnerId(request, response) {
    try {
        const ownerId = request.params.id
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

        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            type_id: request.query.type_id,
            vehicle_type_id: request.query.vehicle_type_id,
        }

        const queryResult = await getListPackagesByOwnerId(
            ownerId,
            startIndex,
            limit,
            params,
        )

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

        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            type_id: request.query.type_id,
            vehicle_type_id: request.query.vehicle_type_id,
        }

        const queryResult = await getListPackagesByParkingLotId(
            parkingLotId,
            startIndex,
            limit,
            params,
        )

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
        const userId = request.userData.userId
        const parkingLotId = request.body.parking_lot_id

        if (checkUserOwnParkingLot(parkingLotId, userId)) {
            const newPackage = {
                parking_lot_id: parkingLotId,
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

            addNewPackage(newPackage).then((_) => {
                return response.status(200).json({
                    message: 'Create Package successfully!',
                })
            })
        } else {
            return response.status(400).json({
                message: 'User is not the owner of this parking lot!',
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
                name: request.body.name,
                type_id: request.body.type_id,
                vehicle_type_id: request.body.vehicle_type_id,
                price: request.body.price,
            }

            const validateResponse = validators.validatePackage(updatePackage)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update Package data
            updatePackageById(updatePackage, dbPackage.id).then((_) => {
                return response.status(200).json({
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
    indexByOwnerId: indexByOwnerId,
    indexByParkingLotId: indexByParkingLotId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
