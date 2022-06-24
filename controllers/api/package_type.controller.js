const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

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
        const queryResult = await getListPackageTypes(startIndex, limit, params)
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
