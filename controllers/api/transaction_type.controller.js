const {
    getListTransactionTypes,
    getTransactionTypeById,
    addNewTransactionType,
    updateTransactionTypeById,
    deleteTransactionTypeById,
} = require('../CRUD/transaction_type')

async function index(request, response) {
    try {
        const queryResult = await getListTransactionTypes()
        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByTransactionTypeId(request, response) {
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

        const newTransactionType = {
            type_name: typeName,
        }
        const validateResponse = validators.validateTransaction(newTransaction)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        addNewTransactionType(newTransactionType).then((_) => {
            return response.status(201).json({
                message: 'Create Transaction type successfully!',
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
            const updateTransactionType = {
                type_name: request.body.type_name,
            }
            const validateResponse = validator.validateTransaction(
                updateTransactionType,
            )
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update transactionType data
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
            deleteTransactionTypeById(dbTransactionType.id)
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
            message: 'Something went wrong !',
            error: error,
        })
    }
}

module.exports = {
    index: index,
    showById: indexByTransactionTypeId,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
}
