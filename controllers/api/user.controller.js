const validators = require(process.cwd() + '/helpers/validators/index')

const { updateUserInfoByUserId } = require('../CRUD/user_info')
const { getUserById, updateUserById } = require('../CRUD/user')

async function update(request, respond) {
    try {
        const userId = request.params.id

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            // Update user'name and user's infos
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
                return respond.status(400).json({
                    message: 'Validation failed!',
                    errors: validateResponse,
                })
            }

            updateUserById(updateUser, dbUser.id)
            updateUserInfoByUserId(updateUserInfo, dbUser.id)

            return respond.status(200).json({
                message: 'Update user information successfully!',
            })
        } else {
            return respond.status(404).json({
                message: 'User not found!',
            })
        }
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = {
    update: update,
}
