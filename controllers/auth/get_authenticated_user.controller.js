const { getUserById } = require('../CRUD/user');
const { getUserInfoByUserId } = require('../CRUD/user_info');

async function getAuthenticatedUser(request, respond) {
    try {
        // Get user id from JsonWebToken
        const userId = request.userData.userId;

        // Check if user exists
        const dbUser = await getUserById(userId);
        if (dbUser) {
            // Get user's info
            const dbUserInfo = await getUserInfoByUserId(dbUser.id);
            if (!dbUserInfo) {
                return respond.status(404).json({
                    message: 'User\'s info not found!',
                });
            }

            return respond.status(200).json({
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role,
                is_verified: dbUser.is_verified,
                avatar: dbUserInfo.avatar,
                birthday: dbUserInfo.birthday,
                address: dbUserInfo.address,
                phone_number: dbUserInfo.phone_number,
                gender: dbUserInfo.gender,
            });
        } else {
            return respond.status(404).json({
                message: 'User not found!',
            });
        }
    } catch (error) {
        return respond.status(500).json({
            message: 'Something went wrong!',
            error: error,
        });
    }
}

module.exports = getAuthenticatedUser;
