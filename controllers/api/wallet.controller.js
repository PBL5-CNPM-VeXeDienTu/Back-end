const {
    getListWallets,
    getWalletById,
    getWalletByUserId,
    updateWalletById,
} = require('../CRUD/wallet')
const { addNewTransaction } = require('../CRUD/transaction')

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

        const queryResult = await getListWallets(startIndex, limit)

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
        const walletId = request.params.id

        const dbWallet = await getWalletById(walletId)

        return response.status(200).json(dbWallet)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function showByUserId(request, response) {
    try {
        const userId = request.params.id

        const dbWallet = await getWalletByUserId(userId)

        return response.status(200).json(dbWallet)
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
            const cardValue = 20000
            const updateWallet = {
                balance: dbWallet.balance + cardValue,
            }
            updateWalletById(updateWallet, dbWallet.id).then((result) => {
                // Add new transaction
                const newTransaction = {
                    wallet_id: dbWallet.id,
                    old_balance: oldBalance,
                    amount: cardValue,
                    new_balance: result.balance,
                    type_id: 1,
                    reference_id: result.id,
                }
                addNewTransaction(newTransaction)

                return response.status(201).json({
                    message: 'Recharge wallet successfully!',
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

                return response.status(201).json({
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
    showById: showById,
    showByUserId: showByUserId,
    rechargeById: rechargeById,
    withDrawById: withDrawById,
}
