const validators = require(process.cwd() + '/helpers/validators')

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
        const queryResult = await getListFeatureTypes()
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

        if (checkNameExisted(name)) {
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
        const dbFeature = await getFeedbackTypeById(featureId)

        if (dbFeature) {
            const name = request.body.type_name

            if (checkNameExisted(name)) {
                return response.status(400).json({
                    message: 'Feature already exists!',
                })
            }

            const updateFeature = {
                type_name: name,
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
