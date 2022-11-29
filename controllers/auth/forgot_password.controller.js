const { transporter, mailConfig } = require(process.cwd() +
    '/helpers/mailer/transporter')
const uuid = require('uuid')

const { updateAuthKeyById, addNewAuthKey } = require('../CRUD/authkey')
const { getUserByEmail } = require('../CRUD/user')

const RESET_PASSWORD = 2

async function forgotPassword(request, response) {
    try {
        const dbUser = await getUserByEmail(request.body.email)
        if (dbUser) {
            // Check if email is verified
            if (!dbUser.is_verified) {
                return response.status(409).json({
                    message: 'Email is not verified!',
                })
            }

            // Send email to reset password
            const authKey = uuid.v1()
            transporter.sendMail(
                mailConfig(dbUser.email, RESET_PASSWORD, authKey),
                function (err, info) {
                    if (err) console.log(err)
                    else
                        console.log(
                            'Email sended successfully! Info: ' + info.response,
                        )
                },
            )

            // Save authKey, replace old key if already exist
            const oldAuthKey = dbUser.AuthKey
            if (oldAuthKey)
                await updateAuthKeyById({ key: authKey }, oldAuthKey.id)
            else await addNewAuthKey({ user_id: dbUser.id, key: authKey })

            return response.status(200).json({
                message: 'Reset password email sended!',
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

module.exports = forgotPassword
