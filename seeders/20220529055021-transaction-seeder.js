'use strict'

const {
    getWalletById,
    getWalletByUserId,
    updateWalletById,
} = require('../controllers/CRUD/wallet')
const { addNewTransaction } = require('../controllers/CRUD/transaction')
const {
    getListParkingHistories,
} = require('../controllers/CRUD/parking_history')
const { getListUserPackages } = require('../controllers/CRUD/user_package')

const RECHARGE_TRANSACTION_TYPE_ID = 1
const WITH_DRAW_TRANSACTION_TYPE_ID = 2
const REFUND_TRANSACTION_TYPE_ID = 3
const PAY_PARKING_FEE_TRANSACTION_TYPE_ID = 4
const BUY_PACKAGE_TRANSACTION_TYPE_ID = 5

async function generateRechargeTransaction(walletId) {
    const amount = Math.floor(Math.random() * 3 + 2) * 10000

    const wallet = await getWalletById(walletId)
    if (wallet) {
        const updateWallet = {
            balance: wallet.balance + amount,
        }
        updateWalletById(updateWallet, wallet.id)

        return {
            wallet_id: walletId,
            type_id: RECHARGE_TRANSACTION_TYPE_ID,
            reference_id: walletId,
            amount: amount,
        }
    }
}

async function generateWithDrawTransaction(walletId) {
    let amount = Math.floor(Math.random() * 3 + 1) * 10000

    const wallet = await getWalletById(walletId)
    if (wallet) {
        if (amount < wallet.balance) {
            const updateWallet = {
                balance: wallet.balance - amount,
            }
            updateWalletById(updateWallet, wallet.id)

            return {
                wallet_id: walletId,
                type_id: WITH_DRAW_TRANSACTION_TYPE_ID,
                reference_id: walletId,
                amount: -amount,
            }
        }
    }
}

async function generateRefundTransaction() {
    // Làm gì đây nhỉ :> ??
}

async function generatePayParkingFeeTransaction() {
    // Duyệt qua bảng lịch sử đổ xe -> thêm transaction
    const dbParkingHistoryList = (await getListParkingHistories(1, 1000))?.rows

    dbParkingHistoryList.forEach(async (parkingHistory) => {
        const dbWallet = await getWalletByUserId(parkingHistory.user_id)
        const transaction = {
            wallet_id: dbWallet.id,
            type_id: PAY_PARKING_FEE_TRANSACTION_TYPE_ID,
            reference_id: parkingHistory.id,
            amount: -parkingHistory.cost,
            createdAt: parkingHistory.createdAt,
            updatedAt: parkingHistory.updatedAt,
        }
        addNewTransaction(transaction)
    })
}

async function generateBuyPackageTransaction() {
    // Duyệt qua bảng user package để thêm vào transaction
    const dbUserPackageList = (await getListUserPackages(1, 1000))?.rows

    dbUserPackageList.forEach(async (userPackage) => {
        const dbWallet = await getWalletByUserId(userPackage.user_id)
        const transaction = {
            wallet_id: dbWallet.id,
            type_id: BUY_PACKAGE_TRANSACTION_TYPE_ID,
            reference_id: userPackage.id,
            amount: -userPackage.price,
            createdAt: userPackage.createdAt,
            updatedAt: userPackage.updatedAt,
        }
        addNewTransaction(transaction)
    })
}

async function generateTransactionData() {
    let data = []

    const minWalletId = 1,
        maxWalletId = 6

    for (let i = 0; i < 30; i++) {
        // Random id ví -> random type id -> lấy id tham chiếu -> lấy số tiền -> thêm vào mảng transaction
        const walletId = Math.floor(
            Math.random() * (maxWalletId - minWalletId) + minWalletId,
        )
        const typeId = Math.random() < 0.5 ? 1 : 2

        switch (typeId) {
            case RECHARGE_TRANSACTION_TYPE_ID:
                data.push(await generateRechargeTransaction(walletId))
                break
            case WITH_DRAW_TRANSACTION_TYPE_ID:
                data.push(await generateWithDrawTransaction(walletId))
                break
        }
        console.log(data);
    }

    return data
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await generatePayParkingFeeTransaction()
        await generateBuyPackageTransaction()
        await queryInterface.bulkInsert(
            'Transactions',
            await generateTransactionData(),
        )
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Transactions', null, {})
    },
}
