const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

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
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)

        const startIndex = (page - 1) * limit

        const params = {
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            created_from_date: request.query.created_from_date
                ? request.query.created_from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            created_to_date: request.query.created_to_date
                ? request.query.created_to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
            updated_from_date: request.query.updated_from_date
                ? request.query.updated_from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            updated_to_date: request.query.updated_to_date
                ? request.query.updated_to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const queryResult = await getListVehicleTypes(startIndex, limit, params)
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

        if (await checkTypeNameExisted(typeName)) {
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

            if (await checkTypeNameExisted(typeName)) {
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
