const hashHelper = require(process.cwd() +
    '/helpers/password-encrypter/hash_helper')

const { getAuthKeyByUserId, deleteAuthKeyById } = require('../CRUD/authkey')
const { getUserByEmail, updateUserById } = require('../CRUD/user')

async function resetPassword(request, response) {
    try {
        // Check if email exists
        const dbUser = await getUserByEmail(request.params.email)
        if (dbUser) {
            // Check if authentication key is valid
            const dbAuthKey = await getAuthKeyByUserId(dbUser.id)
            if (request.params.authKey != dbAuthKey?.key) {
                return response.status(409).json({
                    message: 'Invalid authentication key!',
                })
            }

            // If key is valid, delete old key and reset password
            deleteAuthKeyById(dbAuthKey.id)

            // Generate new random password
            const newPassword = (Math.random() + 1).toString(36).substring(3)

            // Update user's password
            const updateUser = {
                password: hashHelper.hash(newPassword),
            }
            updateUserById(updateUser, dbUser.id).then(() => {
                return response.status(200).json({
                    message:
                        'Password reset successfully! You can login with new password now!',
                    newPassword: newPassword,
                })
            })
        } else {
            return response.status(404).json({
                message: 'Email not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = resetPassword
