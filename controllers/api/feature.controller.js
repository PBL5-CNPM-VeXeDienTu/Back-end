const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListFeatureTypes,
    getFeatureById,
    addNewFeature,
    updateFeatureById,
    deleteFeatureById,
    checkNameExisted,
} = require('../CRUD/feature')

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

        const queryResult = await getListFeatureTypes(startIndex, limit, params)
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
        const featureId = request.params.id
        const queryResult = await getFeatureById(featureId)
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
        const name = request.body.name

        if (await checkNameExisted(name)) {
            return response.status(400).json({
                message: 'Feature already exists!',
            })
        }

        const newFeature = {
            name: name,
        }

        const validateResponse = validators.validateFeature(newFeature)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewFeature(newFeature).then((_) => {
            return response.status(201).json({
                message: 'Create feature successfully!',
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
        const featureId = request.params.id
        const dbFeature = await getFeatureById(featureId)

        if (dbFeature) {
            const name = request.body.name

            if (await checkNameExisted(name)) {
                return response.status(400).json({
                    message: 'Feature already exists!',
                })
            }

            const updateFeature = {
                name: name,
            }
            const validateResponse = validators.validateFeature(updateFeature)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update featured data
            updateFeatureById(updateFeature, dbFeature.id).then((_) => {
                return response.status(201).json({
                    message: 'Update feature successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Feature not found!',
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
        const featureId = request.params.id

        //Check feedBack type is exits
        const dbFeature = await getFeatureById(featureId)
        if (dbFeature) {
            await deleteFeatureById(dbFeature.id)
            return response.status(200).json({
                message: 'Delete feature successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Feature not found!',
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
