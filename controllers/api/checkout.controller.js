const { Op } = require('sequelize')

const { getCurrentDateTime } = require(process.cwd() + '/helpers/datetime')

const { checkUserOwnParkingLot } = require('../CRUD/parking_lot')
const { getVehicleByLicensePlate } = require('../CRUD/vehicle')
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

        if (!(await checkUserOwnParkingLot(parkingLotId, userId))) {
            return response.status(400).json({
                message: 'User is not the owner of this parking lot!',
            })
        }

        const qrData = request.body.qr_data

        const licensePlate = request.body.license_plate

        const dbVehicle = await getVehicleByLicensePlate(licensePlate)
        if (dbVehicle) {
            if (qrData.vehicle_id !== dbVehicle.id) {
                return response.status(400).json({
                    message: "QR's vehicle id not match!",
                })
            }

            // Check if parking lot is correct
            if (qrData.parking_lot_id != parkingLotId) {
                return response.status(400).json({
                    message: "QR's parking lot id not match!",
                })
            }

            // Get parking state of vehicle
            const parkingHistoryParams = {
                parking_lot_id: qrData.parking_lot_id,
                is_parking: true,
                checkin_time: qrData.checkin_time,
                qr_key: qrData.qr_key,
                vehicle: {
                    id: qrData.vehicle_id,
                    license_plate: licensePlate,
                },
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

            const dbUserPackage = await getUserPackageByParams(
                userPackageParams,
            )

            // If user have none valid user package
            if (!dbUserPackage) {
                // Get user's wallet
                const dbWallet = await getWalletByUserId(
                    dbParkingHistory.user_id,
                )
                if (!dbWallet) {
                    return response.status(404).json({
                        message: "User's wallet not found!",
                    })
                }

                // Check if user have valid wallet balance
                if (dbWallet.balance >= dbParkingPrice.price) {
                    // Update balance
                    const updateWallet = {
                        balance: dbWallet.balance - dbParkingPrice.price,
                    }
                    await updateWalletById(updateWallet, dbWallet.id)

                    // Add new transaction history
                    const newTransaction = {
                        wallet_id: dbWallet.id,
                        type_id: PAY_PARKING_FEE_TRANSACTION_TYPE_ID,
                        reference_id: dbParkingHistory.id,
                        amount: -dbParkingPrice.price,
                    }
                    await addNewTransaction(newTransaction)

                    // Checkout success, update parking history
                    await checkoutSuccess(
                        dbParkingPrice.price,
                        dbParkingHistory.id,
                    )

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
        } else {
            return response.status(404).json({
                message: 'Vehicle not found!',
            })
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
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
