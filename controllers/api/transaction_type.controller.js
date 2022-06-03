const validators = require(process.cwd() + '/helpers/validators')

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
        const queryResult = await getListTransactionTypes()
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

        if (checkTypeNameExisted(typeName)) {
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

            if (checkTypeNameExisted(typeName)) {
                return response.status(400).json({
                    message: 'Feedback type already exists!',
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
