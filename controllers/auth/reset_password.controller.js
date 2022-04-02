const models = require(process.cwd() + '/models');
const hashHelper = require(process.cwd() +
    '/helpers/password-encrypter/hash_helper');

async function resetPassword(request, respond) {
    try {
        // Check if email exists
        const dbUser = (
            await models.User.findOne({
                where: { email: request.params.email },
            })
        )?.dataValues;
        if (dbUser) {
            // Check if authentication key is valid
            const dbAuthKey = (
                await models.AuthKey.findOne({ where: { user_id: dbUser.id } })
            )?.dataValues;
            if (request.params.authKey != dbAuthKey?.key) {
                return respond.status(409).json({
                    message: 'Invalid authentication key!',
                });
            }

            // If key is valid, delete old key and reset password
            models.AuthKey.destroy({ where: { id: dbAuthKey.id } });

            // Generate new random password
            const newPassword = (Math.random() + 1).toString(36).substring(3);

            // Update user's password
            const updateUser = {
                password: hashHelper.hash(newPassword),
            };
            models.User.update(updateUser, {
                where: { email: dbUser.email },
            }).then((result) => {
                return respond.status(200).json({
                    message:
                        'Password reset successfully! You can login with new password now!',
                    newPassword: newPassword,
                });
            });
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

module.exports = resetPassword;
