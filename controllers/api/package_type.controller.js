const {
    getListPackageTypes,
    getPackageTypeById,
    addNewPackageType,
    updatePackageTypeById,
    deletePackageTypeById,
} = require('../CRUD/package_type')

async function index(request, response) {
    try {
        const queryResult = await getListPackageTypes()
        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByPackageTypeId(request, response) {
    try {
        const packageTypeId = request.params.id
        const queryResult = await getPackageTypeById(packageTypeId)
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

        const newPackageType = {
            type_name: typeName,
        }
        const validateResponse = validators.validatePackage(newPackage)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewPackageType(newPackageType).then((_) => {
            return response.status(201).json({
                message: 'Create Package type successfully!',
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
        const packageTypeId = request.params.id
        const dbPackageType = await getPackageTypeById(packageTypeId)
        if (dbPackdbPackageTypeage) {
            const updatePackageType = {
                type_name: request.body.type_name,
            }
            const validateResponse =
                validator.validatePackage(updatePackageType)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update packageType data
            updatePackageTypeById(updatePackageType, dbPackageType.id).then(
                (_) => {
                    return response.status(201).json({
                        message: 'Update package type successfully!',
                    })
                },
            )
        } else {
            return response.status(404).json({
                message: 'Package type not found!',
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
        const packageTypeId = request.params.id
        //Check package type is exits
        const dbPackageType = await getPackageTypeById(packageTypeId)
        if (dbPackage) {
            deletePackageTypeById(dbPackageType.id)
            return response.status(200).json({
                message: 'Delete package type successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Package type not found!',
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
    showById: indexByPackageTypeId,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
