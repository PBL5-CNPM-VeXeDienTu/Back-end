const validators = require(process.cwd() + '/helpers/validators')

const { updateUserInfoByUserId } = require('../CRUD/user_info')
const {
    getListUsers,
    getUserById,
    updateUserById,
    softDeleteUserById,
} = require('../CRUD/user')
const { softDeleteVehicleByOwnerId } = require('../CRUD/vehicle')
const { softDeleteParkingLotByOwnerId } = require('../CRUD/parking_lot')

const BASIC_USER_ROLE = 1
const PARKING_LOT_USER_ROLE = 2

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

        const queryResult = await getListUsers(startIndex, limit)

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
        const userId = request.params.id

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            return response.status(200).json(dbUser)
        } else {
            return response.status(404).json({
                message: 'User not found!',
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
        const userId = request.params.id

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            // Update user's name and user's infos
            const updateUser = {
                name: request.body.name,
            }

            const updateUserInfo = {
                gender: request.body.gender,
                birthday: request.body.birthday,
                address: request.body.address,
                phone_number: request.body.phone_number,
            }

            // Validate new user's data
            const validateResponse = [
                validators.validateUser(updateUser),
                validators.validateUserInfo(updateUserInfo),
            ]
            if (!validateResponse.every((valid) => valid === true)) {
                return response.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            updateUserById(updateUser, dbUser.id)
            updateUserInfoByUserId(updateUserInfo, dbUser.id)

            return response.status(200).json({
                message: 'Update user information successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'User not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

async function softDeleteById(request, response) {
    try {
        const userId = request.params.id

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            // Soft delete user
            softDeleteUserById(dbUser.id)

            // Check user role, soft delete vehicle/parking-lot this user own
            if (dbUser.role === BASIC_USER_ROLE)
                softDeleteVehicleByOwnerId(dbUser.id)
            if (dbUser.role === PARKING_LOT_USER_ROLE)
                softDeleteParkingLotByOwnerId(dbUser.id)

            return response.status(200).json({
                message: 'Delete user successfully!',
            })
        } else {
            return response.status(404).json({
                message: 'User not found!',
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
    updateById: updateById,
    softDeleteById: softDeleteById,
}
