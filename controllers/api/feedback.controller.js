const validators = require(process.cwd() + '/helpers/validators')

const {
    getListFeedbacks,
    getListFeedbackByUserId,
    getFeedbackById,
    addNewFeedback,
    updateFeedbackById,
} = require('../CRUD/feedback')

async function index(request, response) {
    try {
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)
        const queryParams = request.query

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
            txt_search: queryParams.txt_search
                ? queryParams.txt_search.trim()
                : '',
            type_id: queryParams.type_id,
            feature_id: queryParams.feature_id,
            is_processed: queryParams.is_processed,
        }

        const queryResult = await getListFeedbacks(startIndex, limit, params)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByUserId(request, response) {
    try {
        const userId = request.params.id
        const page = Number.parseInt(request.query.page)
        const limit = Number.parseInt(request.query.limit)
        const queryParams = request.query

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
            txt_search: queryParams.txt_search
                ? queryParams.txt_search.trim()
                : '',
            type_id: queryParams.type_id,
            feature_id: queryParams.feature_id,
            is_processed: queryParams.is_processed,
        }

        const dbFeedback = await getListFeedbackByUserId(
            userId,
            startIndex,
            limit,
            params,
        )

        return response.status(200).json(dbFeedback)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showById(request, response) {
    try {
        const feedbackId = request.params.id

        const dbFeedback = await getFeedbackById(feedbackId)

        return response.status(200).json(dbFeedback)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const newFeedback = {
            user_id: request.userData.userId,
            type_id: request.body.type_id,
            feature_id: request.body.feature_id,
            content: request.body.content,
            is_processed: false,
            response: null,
        }

        // Validate new feedback's data
        const validateResponse = validators.validateFeedback(newFeedback)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewFeedback(newFeedback).then((_) => {
            return response.status(201).json({
                message: 'Create feedback successfully!',
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
        const feedbackId = request.params.id

        // Check if feedback exists
        const dbFeedback = await getFeedbackById(feedbackId)
        if (dbFeedback) {
            const updateFeedback = {
                is_processed: request.body.is_processed,
                response: request.body.response,
            }

            // Validate update feedback's data
            const validateResponse = validators.validateFeedback(updateFeedback)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            // Update feedback's data
            updateFeedbackById(updateFeedback, dbFeedback.id).then((_) => {
                return response.status(201).json({
                    message: 'Update feedback successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Feedback not found!',
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
        const feedbackId = request.params.id

        // Check if feedback exists
        const dbFeedback = await getFeedbackById(feedbackId)
        if (dbFeedback) {
            // Delete feedback
            deleteById(dbFeedback.id)

            return response.status(200).json({
                message: 'Delete feedback successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Feedback not found!',
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
    indexByUserId: indexByUserId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
