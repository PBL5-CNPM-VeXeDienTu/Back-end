const models = require(process.cwd() + '/models');

async function getAuthenticatedUser(request, respond){
    try {
        // Get user id from JsonWebToken
        const id = request.userData.userId;

        // Check if user exists
        const dbUser = (await models.User.findByPk(id))?.dataValues;
        if (dbUser) {
            return respond.status(200).json(dbUser);
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

module.exports = getAuthenticatedUser;