const { toLocaleString } = require(process.cwd() + '/helpers/datetime')

const { getUserById } = require('../CRUD/user')
const { getUserInfoByUserId } = require('../CRUD/user_info')

async function getAuthenticatedUser(request, response) {
    try {
        // Get user id from JsonWebToken
        const userId = request.userData.userId

        // Check if user exists
        const dbUser = await getUserById(userId)
        if (dbUser) {
            return response.status(200).json(dbUser)
        } else {
            return response.status(404).json({
                message: 'User not found!',
            })
        }
    } catch (error) {
        return response.status(500).json({
            message: 'Something went wrong!',
            error: error,
        })
    }
}

module.exports = getAuthenticatedUser
