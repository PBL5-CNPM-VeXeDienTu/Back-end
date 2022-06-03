const validators = require(process.cwd() + '/helpers/validators')
const hashHelper = require(process.cwd() +
    '/helpers/password-encrypter/hash_helper')

const { addNewUserInfo, updateUserInfoByUserId } = require('../CRUD/user_info')
const {
    getListUsers,
    getUserById,
    getUserByEmail,
    addNewUser,
    updateUserById,
    softDeleteUserById,
} = require('../CRUD/user')
const { softDeleteVehicleByOwnerId } = require('../CRUD/vehicle')
const { softDeleteParkingLotByOwnerId } = require('../CRUD/parking_lot')
const { getRoleById } = require('../CRUD/role')
const { addNewWallet } = require('../CRUD/wallet')

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

async function create(request, response) {
    try {
        // Check if email already registered
        const dbUser = await getUserByEmail(request.body.email)
        if (dbUser) {
            return response.status(409).json({
                message: 'Email already exists!',
            })
        }

        // Check if role is valid
        const dbRole = await getRoleById(request.body.role)
        if (!dbRole) {
            return response.status(409).json({
                message: 'Invalid role!',
            })
        }

        // Create new user
        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: hashHelper.hash(request.body.password),
            role: request.body.role,
            is_verified: true,
        }

        // Validate new user's data
        const validateResponse = validators.validateUser(newUser)
        if (validateResponse !== true) {
            return response.status(400).json({
                message: 'Validation failed!',
                errors: validateResponse,
            })
        }

        // Add new user to database
        addNewUser(newUser).then(async (result) => {
            // Create new user info
            const newUserInfo = {
                user_id: result.id,
                gender: request.body.gender,
                birthday: request.body.birthday,
                address: request.body.address,
                phone_number: request.body.phone_number,
                avatar: 'public/images/avatars/user/default-avatar.png',
            }
            await addNewUserInfo(newUserInfo)

            // Create new wallet
            const newWallet = {
                user_id: result.id,
                balance: 0,
            }
            await addNewWallet(newWallet)

            return response.status(201).json({
                message: 'Create user successfully!',
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
            await softDeleteUserById(dbUser.id)

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
    create: create,
    updateById: updateById,
    softDeleteById: softDeleteById,
}
