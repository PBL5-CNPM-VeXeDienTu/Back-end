const models = require(process.cwd() + '/models');
const hashHelper = require(process.cwd() + '/helpers/password-encrypter/hash_helper');

async function changePassword(request, respond) {
    try {
        const id = request.userData.userId;

        // Check if user exists
        const dbUser = (await models.User.findByPk(id))?.dataValues;
        if (dbUser) {
            const newPassword = request.body.newPassword;

             // Update user's password
             const updateUser = {
                password: hashHelper.hash(newPassword)
            }
            models.User.update(updateUser, {where: {email: dbUser.email}}).then(result => {
                return respond.status(200).json({
                    message: "Password change successfully!",
                });
            })
        }
        else {
            return respond.status(404).json({
                message: "User not found!"
            });
        }
    } catch (error) {
        return respond.status(500).json({
            message: "Something went wrong!",
            error: error
        });
    }
}

module.exports = changePassword;