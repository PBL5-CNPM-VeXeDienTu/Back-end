const models = require(process.cwd() + '/models');

async function verifyEmail(request, respond) {
    try {
        const dbUser = (await models.User.findOne({where:{email: request.params.email}}))?.dataValues;
        if (dbUser) {
            if (!dbUser.is_verified) {
                dbUser.is_verified = true;
                models.User.update(dbUser, {where:{id: dbUser.id}}).then(result => {
                    return respond.status(200).json({
                        message: "Email verified successfully!",
                    });
                });
            } 
            else {
                return respond.status(401).json({
                    message: "Email is already verified!",
                    error: error
                });
            }
        }
        else {
            return respond.status(404).json({
                message: "Email not found!",
            });
        }
    } catch (error) {
        return respond.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    }
}

module.exports = verifyEmail;