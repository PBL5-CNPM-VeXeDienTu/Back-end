const {
    getListFeedbackTypes,
    getFeedbackTypeById,
    addNewFeedbackType,
    updateFeedbackTypeById,
    deleteFeedbackTypeById,
} = require('../CRUD/feedback_type')

async function index(request, response) {
    try {
        const queryResult = await getListFeedbackTypes()
        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByFeedbackTypeId(request, response) {
    try {
        const feedbackTypeId = request.params.id
        const queryResult = await getFeedbackTypeById(feedbackTypeId)
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

        const newFeedbackType = {
            type_name: typeName,
        }
        const validateResponse = validators.validateFeedback(newFeedbackType)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewFeedbackType(newFeedbackType).then((_) => {
            return response.status(201).json({
                message: 'Create feedback type successfully!',
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
        const feedbackTypeId = request.params.id
        const dbFeedbackType = await getFeedbackTypeById(feedbackTypeId)
        if (dbPackdbFeedbackTypeage) {
            const updateFeedbackType = {
                type_name: request.body.type_name,
            }
            const validateResponse =
                validator.validateFeedback(updateFeedbackType)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update feedbackType data
            updateFeedbackTypeById(updateFeedbackType, dbFeedbackType.id).then(
                (_) => {
                    return response.status(201).json({
                        message: 'Update feedBack type successfully!',
                    })
                },
            )
        } else {
            return response.status(404).json({
                message: 'Feedback type not found!',
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
        const feedbackTypeId = request.params.id
        //Check feedBack type is exits
        const dbFeedbackType = await getFeedbackTypeById(feedbackTypeId)
        if (dbFeedbackType) {
            deleteFeedbackTypeById(dbFeedbackType.id)
            return response.status(200).json({
                message: 'Delete feedBack type successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Feedback type not found!',
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
    showById: indexByFeedbackTypeId,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
