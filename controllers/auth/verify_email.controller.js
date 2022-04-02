const models = require(process.cwd() + '/models');

async function verifyEmail(request, respond) {
    try {
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
            // If key is valid, delete old key and confirm email
            models.AuthKey.destroy({ where: { id: dbAuthKey.id } });
            if (!dbUser.is_verified) {
                dbUser.is_verified = true;
                models.User.update(dbUser, { where: { id: dbUser.id } }).then(
                    (result) => {
                        return respond.status(200).json({
                            message: 'Email verified successfully!',
                        });
                    },
                );
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
