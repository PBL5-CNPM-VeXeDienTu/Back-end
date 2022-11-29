const { getCurrentDateTime } = require('../../helpers/datetime')
const {
    getListWallets,
    getWalletById,
    getWalletByUserId,
    updateWalletById,
} = require('../CRUD/wallet')
const {
    addNewTransaction,
    getListTransactionsByWalletId,
} = require('../CRUD/transaction')

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
            role: request.query.role,
            txt_search: request.query.txt_search
                ? request.query.txt_search.trim()
                : '',
            from_date: request.query.from_date
                ? request.query.from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            to_date: request.query.to_date
                ? request.query.to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const queryResult = await getListWallets(startIndex, limit, params)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showByOwnerId(request, response) {
    try {
        // Transaction list's params
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
            type_id: request.query.type_id,
            state: request.query.state ? request.query.state.trim() : '',
            from_date: request.query.from_date
                ? request.query.from_date.trim() + ' 00:00:00'
                : '0000-00-00 00:00:00',
            to_date: request.query.to_date
                ? request.query.to_date.trim() + ' 23:59:59'
                : getCurrentDateTime().split(' ')[0] + ' 23:59:59',
        }

        const ownerId = request.params.id

        const dbWallet = await getWalletByUserId(ownerId)

        if (!dbWallet) {
            return response.status(404).json({
                message: 'Wallet not found!',
            })
        }

        const dbTransactions = await getListTransactionsByWalletId(
            dbWallet.id,
            startIndex,
            limit,
            params,
        )

        return response.status(200).json({
            Wallet: dbWallet,
            Transactions: dbTransactions,
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function rechargeById(request, response) {
    try {
        const defaultSerial = 'awesomedevteam_20k'
        const walletId = request.params.id
        // const cardType = request.body.cardType
        const serial = request.body.serial

        // Check if wallet exists
        const dbWallet = await getWalletById(walletId)
        if (dbWallet) {
            // Check if serial is correct
            if (serial !== defaultSerial) {
                return response.status(400).json({
                    message: "Invalid card's serial!",
                })
            }

            const oldBalance = dbWallet.balance

            // Update wallet's balance
            const cardPrice = Number.parseInt(request.body.price)
            const updateWallet = {
                balance: oldBalance + cardPrice,
            }
            await updateWalletById(updateWallet, dbWallet.id)

            // Add new transaction
            const newTransaction = {
                wallet_id: dbWallet.id,
                old_balance: oldBalance,
                amount: cardPrice,
                new_balance: updateWallet.balance,
                type_id: 1,
                reference_id: dbWallet.id,
            }
            await addNewTransaction(newTransaction)

            return response.status(200).json({
                message: 'Recharge wallet successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'Wallet not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function withDrawById(request, response) {
    try {
        const walletId = request.params.id
        const drawAmount = reques.body.drawAmount

        // Check if wallet exists
        const dbWallet = await getWalletById(walletId)
        if (dbWallet) {
            // Check if draw amount is valid
            if (drawAmount < 0 || dbWallet.balance < drawAmount) {
                return response.status(400).json({
                    message: 'Not enough balance or invalid draw amount!',
                })
            }

            const oldBalance = dbWallet.balance

            // Update wallet's balance
            const updateWallet = {
                balance: dbWallet.balance - drawAmount,
            }
            updateWalletById(updateWallet, dbWallet.id).then((result) => {
                // Add new transaction
                const newTransaction = {
                    wallet_id: dbWallet.id,
                    old_balance: oldBalance,
                    amount: -drawAmount,
                    new_balance: result.balance,
                    type_id: 5,
                    reference_id: result.id,
                }
                addNewTransaction(newTransaction)

                return response.status(200).json({
                    message: 'With draw wallet successfully!',
                })
            })
        } else {
            return response.status(404).json({
                message: 'Wallet not found!',
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
    showByOwnerId: showByOwnerId,
    rechargeById: rechargeById,
    withDrawById: withDrawById,
}
