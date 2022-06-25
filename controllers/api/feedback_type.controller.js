const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListFeedbackTypes,
    getFeedbackTypeById,
    addNewFeedbackType,
    updateFeedbackTypeById,
    deleteFeedbackTypeById,
    checkTypeNameExisted,
} = require('../CRUD/feedback_type')

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

        const queryResult = await getListFeedbackTypes(
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

        if (await checkTypeNameExisted(typeName)) {
            return response.status(400).json({
                message: 'Feedback type already exists!',
            })
        }

        const newFeedbackType = {
            type_name: typeName,
        }

        const validateResponse =
            validators.validateFeedbackType(newFeedbackType)
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

        if (dbFeedbackType) {
            const typeName = request.body.type_name

            if (await checkTypeNameExisted(typeName)) {
                return response.status(400).json({
                    message: 'Feedback type already exists!',
                })
            }

            const updateFeedbackType = {
                type_name: typeName,
            }
            const validateResponse =
                validators.validateFeedbackType(updateFeedbackType)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update feedback type data
            updateFeedbackTypeById(updateFeedbackType, dbFeedbackType.id).then(
                (_) => {
                    return response.status(201).json({
                        message: 'Update feedback type successfully!',
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
            await deleteFeedbackTypeById(dbFeedbackType.id)
            return response.status(200).json({
                message: 'Delete feedback type successfully!',
            })
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

module.exports = {
    index: index,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
