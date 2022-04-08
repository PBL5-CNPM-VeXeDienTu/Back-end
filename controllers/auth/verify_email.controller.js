const { getAuthKeyByUserId, deleteAuthKeyById } = require('../CRUD/authkey');
const { getUserByEmail, updateUserById } = require('../CRUD/user');

async function verifyEmail(request, respond) {
    try {
        const dbUser = await getUserByEmail(request.params.email);
        if (dbUser) {
            // Check if authentication key is valid
            const dbAuthKey = await getAuthKeyByUserId(dbUser.id);
            if (request.params.authKey != dbAuthKey?.key) {
                return respond.status(409).json({
                    message: 'Invalid authentication key!',
                });
            }

            // If key is valid, delete old key and confirm email
            deleteAuthKeyById(dbAuthKey.id);

            if (!dbUser.is_verified) {
                updateUserById({ is_verified: true }, dbUser.id).then(() => {
                    return respond.status(200).json({
                        message: 'Email verified successfully!',
                    });
                });
            } else {
                return respond.status(401).json({
                    message: 'Email is already verified!',
                    error: error,
                });
            }
        } else {
            return respond.status(404).json({
                message: 'Email not found!',
            });
        }
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        });
    }
}

module.exports = verifyEmail;
