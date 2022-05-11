const { deleteAuthKeyById } = require('../CRUD/authkey')
const { getUserByEmail, updateUserById } = require('../CRUD/user')

async function verifyEmail(request, response) {
    try {
        const dbUser = await getUserByEmail(request.params.email)
        if (dbUser) {
            // Check if authentication key is valid
            const dbAuthKey = dbUser.AuthKey
            if (dbAuthKey) {
                if (request.params.authKey != dbAuthKey.key) {
                    return response.status(409).json({
                        message: 'Invalid authentication key!',
                    })
                }
            }

            // If key is valid, delete old key and confirm email
            deleteAuthKeyById(dbAuthKey.id)

            if (!dbUser.is_verified) {
                updateUserById({ is_verified: true }, dbUser.id).then(() => {
                    return response.status(200).json({
                        message: 'Email verified successfully!',
                    })
                })
            } else {
                return response.status(401).json({
                    message: 'Email is already verified!',
                    error: error,
                })
            }
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

module.exports = verifyEmail
