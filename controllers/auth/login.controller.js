const models = require(process.cwd() + '/models');
const hashHelper = require(process.cwd() + '/helpers/password-encrypter/hash_helper');
const jwt = require('jsonwebtoken');

async function login(request, respond) {
    try{
        // Check if email is registered
        const dbUser = (await models.User.findOne({where:{email:request.body.email}}))?.dataValues;
        if (dbUser) {
            // Check if email is verified
            if (!dbUser.is_verified) {
                return respond.status(401).json({
                    message: "Email is not verified!",
                });
            }

            // Check if password is correct
            if (hashHelper.compare(request.body.password, dbUser.password)) {
                jwt.sign({
                    userId: dbUser.id,
                    email: dbUser.email,
                    role: dbUser.role
                }, process.env.JWT_SECRET, function(err, token){
                    return respond.status(200).json({
                        message: "Authentication successfully!",
                        token: token,
                    });
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

module.exports = login