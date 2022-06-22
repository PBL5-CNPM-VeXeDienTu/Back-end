const { Op } = require('sequelize')

const validators = require(process.cwd() + '/helpers/validators')
const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const { checkUserOwnParkingLot } = require('../CRUD/parking_lot')
const { getVehicleByLicensePlate, getVehicleById } = require('../CRUD/vehicle')
const {
    getParkingHistoryByParams,
    updateParkingHistoryById,
} = require('../CRUD/parking_history')
const { getUserPackageByParams } = require('../CRUD/user_package')
const { getWalletByUserId, updateWalletById } = require('../CRUD/wallet')
const {
    getParkingPriceByParkingLotIdAndVehicleTypeId,
} = require('../CRUD/parking_price')
const { addNewTransaction } = require('../CRUD/transaction')

/* 
    qrData: {
        vehicle_id,
        parking_lot_id,
        checkin_time,
        qr_key
    }
*/

const PAY_PARKING_FEE_TRANSACTION_TYPE_ID = 4

async function checkout(request, response) {
    try {
        // Check parking lot owner
        const userId = request.userData.userId
        const parkingLotId = request.body.parking_lot_id
        const licensePlate = request.body.license_plate
        const qrData = request.body.qr_data

        // Validate QR's data
        const validateResponse = validators.validateQRData(qrData)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'QR code validation failed!',
                errors: validateResponse,
            })
        }

        if (!(await checkUserOwnParkingLot(parkingLotId, userId))) {
            return response.status(400).json({
                message: 'User is not the owner of this parking lot!',
            })
        }

        // Validate checkout request
        await validateCheckoutRequest(
            parkingLotId,
            licensePlate,
            qrData,
            response,
        )

        // Get parking history state of vehicle
        const parkingHistoryParams = {
            is_parking: true,
            qr_key: qrData.qr_key,
            parking_lot_id: qrData.parking_lot_id,
            checkin_time: qrData.checkin_time,
            vehicle_id: qrData.vehicle_id,
        }

        const dbParkingHistory = await getParkingHistoryByParams(
            parkingHistoryParams,
        )

        if (!dbParkingHistory) {
            return response.status(404).json({
                message: 'Parking history not found!',
            })
        }

        // Get parking price
        const dbParkingPrice =
            await getParkingPriceByParkingLotIdAndVehicleTypeId(
                dbParkingHistory.parking_lot_id,
                dbParkingHistory.Vehicle.type_id,
            )

        if (!dbParkingPrice) {
            return response.status(404).json({
                message: 'Parking price not found!',
            })
        }

        // Check if user have any valid user package
        const userPackageParams = {
            user_id: dbParkingHistory.user_id,
            parking_lot_id: dbParkingHistory.parking_lot_id,
            vehicle_type_id: dbParkingHistory.Vehicle.type_id,
            expireAt: {
                [Op.gt]: getCurrentDateTime(),
            },
        }

        const dbUserPackage = await getUserPackageByParams(userPackageParams)

        // If user have none valid user package
        if (!dbUserPackage) {
            // Get user's wallet
            const dbWallet = await getWalletByUserId(dbParkingHistory.user_id)
            if (!dbWallet) {
                return response.status(404).json({
                    message: "User's wallet not found!",
                })
            }

            // Check if user have valid wallet balance
            if (dbWallet.balance >= dbParkingPrice.price) {
                const oldBalance = dbWallet.balance

                // Update balance
                const updateWallet = {
                    balance: dbWallet.balance - dbParkingPrice.price,
                }
                await updateWalletById(updateWallet, dbWallet.id).then(
                    async (result) => {
                        // Add new transaction history
                        const newTransaction = {
                            wallet_id: dbWallet.id,
                            old_balance: oldBalance,
                            amount: -dbParkingPrice.price,
                            new_balance: result.balance,
                            type_id: PAY_PARKING_FEE_TRANSACTION_TYPE_ID,
                            reference_id: dbParkingHistory.id,
                        }
                        await addNewTransaction(newTransaction)
                    },
                )

                // Checkout success, update parking history
                await checkoutSuccess(dbParkingPrice.price, dbParkingHistory.id)

                return response.status(200).json({
                    message: 'Checkout successfully!',
                })
            } else {
                return response.status(400).json({
                    message: "User's wallet have not enough balance!",
                })
            }
        }

        // If user have valid user package -> checkout
        await checkoutSuccess(dbParkingPrice.price, dbParkingHistory.id)

        return response.status(200).json({
            message: 'Checkout successfully!',
        })
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function validateCheckoutRequest(
    parkingLotId,
    licensePlate,
    qrData,
    response,
) {
    if (parkingLotId !== qrData.parking_lot_id) {
        return response.status(400).json({
            message: "QR's parking_lot_id not match with current parking lot!",
        })
    }

    const dbVehicle = await getVehicleById(qrData.vehicle_id)
    if (dbVehicle) {
        if (licensePlate !== dbVehicle.license_plate) {
            return response.status(400).json({
                message:
                    "Vehicle of QR's vehicle_id not match with checkout license plate!",
            })
        }
    } else {
        return response.status(404).json({
            message: "Vehicle of QR's vehicle_id not found!",
        })
    }
}

async function checkoutSuccess(cost, parkingHistoryId) {
    const updateParkingHistory = {
        checkout_time: getCurrentDateTime(),
        is_parking: false,
        cost: cost,
    }
    await updateParkingHistoryById(updateParkingHistory, parkingHistoryId)
}

module.exports = {
    checkout: checkout,
}
