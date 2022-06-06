const validators = require(process.cwd() + '/helpers/validators')

const {
    getListVehicleTypes,
    getVehicleTypeById,
    addNewVehicleType,
    updateVehicleTypeById,
    deleteVehicleTypeById,
    checkTypeNameExisted,
} = require('../CRUD/vehicle_type')

async function index(request, response) {
    try {
        const queryResult = await getListVehicleTypes()
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
        const vehicleTypeId = request.params.id
        const queryResult = await getVehicleTypeById(vehicleTypeId)
        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const typeName = request.body.type_name

        if (checkTypeNameExisted(typeName)) {
            return response.status(400).json({
                message: 'Vehicle type already exists!',
            })
        }

        const newVehicleType = {
            type_name: typeName,
        }
        const validateResponse = validators.validateVehicleType(newVehicleType)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewVehicleType(newVehicleType).then((_) => {
            return response.status(201).json({
                message: 'Create vehicle type successfully!',
            })
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const vehicleTypeId = request.params.id
        const dbVehicleType = await getVehicleTypeById(vehicleTypeId)

        if (dbVehicleType) {
            const typeName = request.body.type_name

            if (checkTypeNameExisted(typeName)) {
                return response.status(400).json({
                    message: 'Vehicle type already exists!',
                })
            }

            const updateVehicleType = {
                type_name: typeName,
            }
            const validateResponse =
                validators.validateVehicleType(updateVehicleType)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update vehicle type data
            updateVehicleTypeById(updateVehicleType, dbVehicleType.id).then(
                (_) => {
                    return response.status(201).json({
                        message: 'Update vehicle type successfully!',
                    })
                },
            )
        } else {
            return response.status(404).json({
                message: 'Vehicle type not found!',
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
        const vehicleTypeId = request.params.id

        //Check vehicle type is exits
        const dbVehicleType = await getVehicleTypeById(vehicleTypeId)
        if (dbVehicleType) {
            await deleteVehicleTypeById(dbVehicleType.id)
            return response.status(200).json({
                message: 'Delete vehicle type successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Vehicle type not found!',
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
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
