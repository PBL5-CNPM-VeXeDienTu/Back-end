const validators = require(process.cwd() + '/helpers/validators')

const {
    getListUserPackages,
    getUserPackageById,
    getListUserPackagesByOwnerId,
    addNewUserPackage,
    updateUserPackageById,
    deleteUserPackageById,
} = require('../CRUD/user_package')
const { getPackageById } = require('../CRUD/package')
const { addNewTransaction } = require('../CRUD/transaction')
const { getWalletByUserId } = require('../CRUD/wallet')

const BUY_PACKAGE_TRANSACTION_TYPE_ID = 5

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
            type_id: request.query.type_id,
            vehicle_type_id: request.query.vehicle_type_id,
        }

        const queryResult = await getListUserPackages(startIndex, limit, params)

        return response.status(200).json(queryResult)
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function indexByOwnerId(request, response) {
    try {
        const ownerId = request.params.id
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
            vehicle_type_id: request.query.vehicle_type_id,
        }

        const queryResult = await getListUserPackagesByOwnerId(
            ownerId,
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
        const userPackageId = request.params.id
        const dbUserPackage = await getUserPackageById(userPackageId)
        return response.status(200).json(dbUserPackage)
    } catch (error) {
        return response.status(500).json({
            message: 'Some thing went wrong !',
            error: error,
        })
    }
}

async function create(request, response) {
    try {
        const userId = request.userData.userId
        const packageId = request.body.package_id
        const dbPackage = await getPackageById(packageId)

        // Check if package exists
        if (dbPackage) {
            const dbWallet = await getWalletByUserId(userId)

            if (!dbWallet) {
                return response.status(404).json({
                    message: 'Wallet not found!',
                })
            }

            // Check if user' wallet have enough balance
            if (dbWallet.balance >= dbPackage.price) {
                // Add new user package
                const newUserPackage = {
                    user_id: request.userData.userId,
                    package_id: dbPackage.id,
                    parking_lot_id: dbPackage.parking_lot_id,
                    name: dbPackage.name,
                    type_id: dbPackage.type_id,
                    vehicle_type_id: dbPackage.vehicle_type_id,
                    price: dbPackage.price,
                    expire_at: await getExpireDateOfUserPackage(
                        dbPackage.PackageType.type_name,
                    ),
                }

                const validateResponse =
                    validators.validateUserPackage(newUserPackage)
                if (validateResponse !== true) {
                    return response.status(400).json({
                        message: 'Validation failed!',
                        errors: validateResponse,
                    })
                }

                const addedUserPackage = await addNewUserPackage(newUserPackage)

                // Update wallet's balance and create transaction
                const oldBalance = dbWallet.balance

                // Update balance
                const updateWallet = {
                    balance: dbWallet.balance - addedUserPackage.price,
                }
                await updateWalletById(updateWallet, dbWallet.id).then(
                    async (result) => {
                        // Add new transaction history
                        const newTransaction = {
                            wallet_id: dbWallet.id,
                            old_balance: oldBalance,
                            amount: -addedUserPackage.price,
                            new_balance: result.balance,
                            type_id: BUY_PACKAGE_TRANSACTION_TYPE_ID,
                            reference_id: addedUserPackage.id,
                        }
                        await addNewTransaction(newTransaction)
                    },
                )

                return response.status(201).json({
                    message: 'Create user package successfully!',
                })
            } else {
                return response.status(401).json({
                    message: 'Wallet have not enough balance!',
                })
            }
        } else {
            return response.status(404).json({
                message: 'Package not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function updateById(request, response) {
    try {
        const userPackageId = request.params.id
        const dbUserPackage = await getUserPackageById(userPackageId)

        // Check if user package exists
        if (dbUserPackage) {
            const updateUserPackage = {
                name: request.body.name,
                type_id: request.body.type_id,
                vehicle_type_id: request.body.vehicle_type_id,
                price: request.body.price,
                expire_at: request.body.expire_at,
            }

            const validateResponse =
                validators.validateUserPackage(updateUserPackage)
            if (validateResponse !== true) {
                return response.status(400).json({
                    message: 'Validate failed',
                    errors: validateResponse,
                })
            }

            // Update Package data
            updateUserPackageById(updateUserPackage, dbUserPackage.id).then(
                (_) => {
                    return response.status(201).json({
                        message: 'Update user package successfully!',
                    })
                },
            )
        } else {
            return response.status(404).json({
                message: 'UserPackage not found!',
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
        const userPackageId = request.params.id
        const dbUserPackage = await getUserPackageById(userPackageId)

        // Check if user package exists
        if (dbUserPackage) {
            deleteUserPackageById(dbUserPackage.id)
            return response.status(200).json({
                message: 'Delete user package successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'User package not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong !',
            error: error,
        })
    }
}

async function getExpireDateOfUserPackage(packageTypeName) {
    const date = new Date()
    const now = new Date(date.getTime() - date.getTimezoneOffset() * 60000)

    switch (packageTypeName) {
        case 'Week':
            now.setDate(now.getDate() + 7)
            break
        case 'Month':
            now.setMonth(now.getMonth() + 1)
            break
        case 'Quarter':
            now.setMonth(now.getMonth() + 4)
            break
        case 'Year':
            now.setFullYear(now.getFullYear() + 1)
            break
    }

    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
}

module.exports = {
    index: index,
    indexByOwnerId: indexByOwnerId,
    showById: showById,
    create: create,
    updateById: updateById,
    deleteById: deleteById,
    getExpireDateOfUserPackage,
}
