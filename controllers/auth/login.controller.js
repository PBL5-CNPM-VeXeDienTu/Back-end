const hashHelper = require(process.cwd() +
    '/helpers/password-encrypter/hash_helper');
const jwt = require('jsonwebtoken');

const { getUserByEmail } = require('../CRUD/user');

async function login(request, respond) {
    try {
        // Check if email is registered
        const dbUser = await getUserByEmail(request.body.email);
        if (dbUser) {
            // Check if email is verified
            if (!dbUser.is_verified) {
                return respond.status(401).json({
                    message: 'Email is not verified!',
                });
            }

            // Check if user is deleted
            if (dbUser.deletedAt != null) {
                return respond.status(400).json({
                    message: 'This user was deleted!',
                });
            }

            // Check if password is correct
            if (!hashHelper.compare(request.body.password, dbUser.password)) {
                return respond.status(400).json({
                    message: 'Wrong password!',
                });
            }

            // If password is correct, return JWT Token
            jwt.sign(
                {
                    userId: dbUser.id,
                    email: dbUser.email,
                    role: dbUser.role,
                },
                process.env.JWT_SECRET,
                function (err, token) {
                    if (err) {
                        return respond.status(500).json({
                            message: err,
                        });
                    }
                    return respond.status(200).json({
                        message: 'Authentication successfully!',
                        token: token,
                    });
                },
            );
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

module.exports = login;
