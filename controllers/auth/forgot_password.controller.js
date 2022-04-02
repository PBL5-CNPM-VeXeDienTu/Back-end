const models = require(process.cwd() + '/models');
const { transporter, mailConfig } = require(process.cwd() +
    '/helpers/mailer/transporter');
const uuid = require('uuid');

const RESET_PASSWORD = 2;

async function forgotPassword(request, respond) {
    try {
        const dbUser = (
            await models.User.findOne({ where: { email: request.body.email } })
        )?.dataValues;
        if (dbUser) {
            // Check if email is verified
            if (!dbUser.is_verified) {
                return respond.status(409).json({
                    message: 'Email is not verified!',
                });
            }

            // Send email to reset password
            const authKey = uuid.v1();
            transporter.sendMail(
                mailConfig(dbUser.email, RESET_PASSWORD, authKey),
                function (err, info) {
                    console.log(
                        'Email sended successfully! Info: ' + info.response,
                    );
                },
            );

            // Save authKey, replace old key if already exist
            const oldKey = (
                await models.AuthKey.findOne({ where: { user_id: dbUser.id } })
            )?.dataValues;

            if (oldKey)
                models.AuthKey.update(
                    { key: authKey },
                    { where: { id: oldKey.id } },
                );
            else models.AuthKey.create({ user_id: dbUser.id, key: authKey });

            return respond.status(201).json({
                message: 'Reset password email sended!',
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

module.exports = forgotPassword;
