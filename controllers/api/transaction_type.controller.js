const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const {
    getListTransactionTypes,
    getTransactionTypeById,
    addNewTransactionType,
    updateTransactionTypeById,
    deleteTransactionTypeById,
    checkTypeNameExisted,
} = require('../CRUD/transaction_type')

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

        const queryResult = await getListTransactionTypes(
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
        const transactionTypeId = request.params.id
        const queryResult = await getTransactionTypeById(transactionTypeId)
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
                message: 'Transaction type already exists!',
            })
        }

        const newTransactionType = {
            type_name: typeName,
        }
        const validateResponse =
            validators.validateTransactionType(newTransactionType)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewTransactionType(newTransactionType).then((_) => {
            return response.status(201).json({
                message: 'Create transaction type successfully!',
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
        const transactionTypeId = request.params.id
        const dbTransactionType = await getTransactionTypeById(
            transactionTypeId,
        )

        if (dbTransactionType) {
            const typeName = request.body.type_name

            if (await checkTypeNameExisted(typeName)) {
                return response.status(400).json({
                    message: 'Transaction type already exists!',
                })
            }

            const updateTransactionType = {
                type_name: typeName,
            }
            const validateResponse = validators.validateTransactionType(
                updateTransactionType,
            )
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update transaction type data
            updateTransactionTypeById(
                updateTransactionType,
                dbTransactionType.id,
            ).then((_) => {
                return response.status(201).json({
                    message: 'Update transaction type successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Transaction type not found!',
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
        const transactionTypeId = request.params.id

        //Check transaction type is exits
        const dbTransactionType = await getTransactionTypeById(
            transactionTypeId,
        )
        if (dbTransactionType) {
            await deleteTransactionTypeById(dbTransactionType.id)
            return response.status(200).json({
                message: 'Delete transaction type successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Transaction type not found!',
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
