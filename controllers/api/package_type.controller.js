const validators = require(process.cwd() + '/helpers/validators')

const {
    getListPackageTypes,
    getPackageTypeById,
    addNewPackageType,
    updatePackageTypeById,
    deletePackageTypeById,
    checkTypeNameExisted,
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

async function showById(request, response) {
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

        if (checkTypeNameExisted(typeName)) {
            return response.status(400).json({
                message: 'Package type already exists!',
            })
        }

        const newPackageType = {
            type_name: typeName,
        }
        const validateResponse = validators.validatePackageType(newPackageType)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewPackageType(newPackageType).then((_) => {
            return response.status(201).json({
                message: 'Create package type successfully!',
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

        if (dbPackageType) {
            const typeName = request.body.type_name

            if (checkTypeNameExisted(typeName)) {
                return response.status(400).json({
                    message: 'Package type already exists!',
                })
            }

            const updatePackageType = {
                type_name: typeName,
            }
            const validateResponse =
                validators.validatePackageType(updatePackageType)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update package type data
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
        if (dbPackageType) {
            await deletePackageTypeById(dbPackageType.id)
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
            message: 'Something went wrong!',
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
