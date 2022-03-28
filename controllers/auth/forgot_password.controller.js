const models = require(process.cwd() + '/models');
const { transporter, mailConfig } = require(process.cwd() + '/helpers/mailer/transporter');

const RESET_PASSWORD = 2;

async function forgotPassword(request, respond){
    try {
        const dbUser = (await models.User.findOne({where: {email: request.body.email}}))?.dataValues;
        if (dbUser) {
            // Send email to reset password
            transporter.sendMail(mailConfig(dbUser.email, RESET_PASSWORD), function(err, info){
                console.log("Email sended successfully! Info: " + info.response);
            });
            return respond.status(201).json({
                message: "Reset password email sended!"
            }); 
        }
        else {
            return respond.status(404).json({
                message: "Email not found!"
            });
        }
    } catch (error) {
        return respond.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    }
}

module.exports = forgotPassword