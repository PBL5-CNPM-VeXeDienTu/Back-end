const hashHelper = require(process.cwd() +
    '/helpers/password-encrypter/hash_helper')

const { getUserById, updateUserById } = require('../CRUD/user')

async function changePassword(request, respond) {
    try {
        const userId = request.userData.userId

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            // Check if current password is correct
            const currentPassword = request.body.currentPassword
            if (!hashHelper.compare(currentPassword, dbUser.password)) {
                return respond.status(400).json({
                    message: 'Wrong password!',
                })
            }

            // If password is correct, update it with newPassword
            const newPassword = request.body.newPassword

            // Update user's password
            const updateUser = {
                password: hashHelper.hash(newPassword),
            }
            updateUserById(updateUser, dbUser.id).then(() => {
                return respond.status(200).json({
                    message: 'Password change successfully!',
                })
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

module.exports = changePassword
